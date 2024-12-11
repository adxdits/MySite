---
title: 'Write a malloc?'
excerpt: 'C development'
publishDate: '2024-12-12'
tags:
  - C
  - Object-Oriented
seo:
  image:
    src: 's'
    alt: 's'
---

# malloc

## Implémentation d'un `malloc` simple

Pour implémenter un malloc simple:

```c
#include <assert.h>
#include <string.h>
#include <sys/types.h>
#include <unistd.h>

void *malloc(size_t size) {
  void *p = sbrk(0);
  void *request = sbrk(size);
  if (request == (void*) -1) {
    return NULL; // sbrk failed.
  } else {
    assert(p == request); // Not thread safe.
    return p;
  }
}

```

---

Cette implémentation augmente la taille du tas (heap) à l'aide de sbrk et retourne un pointeur vers la nouvelle région. Cependant, elle manque de certaines fonctionnalités comme la gestion correcte de malloc(0) et la libération de mémoire.

---

## Handling `free`

le prototype pour `free` est:

```c
void free(void *ptr);
```

La libération nécessite de suivre la taille des blocs alloués. Pour ce faire, nous pouvons utiliser une astuce : stocker des métadonnées sur les régions mémoire juste avant le pointeur retourné par `malloc`. Voici comment :

```c
struct block_meta {
  size_t size;
  struct block_meta *next;
  int free;
  int magic; // Debugging only.
};

#define META_SIZE sizeof(struct block_meta)
```

---

## Gestion du tas (heap)

Nous maintenons une liste chaînée des blocs mémoire :

```c
void *global_base = NULL;

struct block_meta *find_free_block(struct block_meta **last, size_t size) {
  struct block_meta *current = global_base;
  while (current && !(current->free && current->size >= size)) {
    *last = current;
    current = current->next;
  }
  return current;
}

struct block_meta *request_space(struct block_meta* last, size_t size) {
  struct block_meta *block;
  block = sbrk(0);
  void *request = sbrk(size + META_SIZE);
  assert((void*)block == request); // Not thread safe.
  if (request == (void*) -1) {
    return NULL; // sbrk failed.
  }

  if (last) {
    last->next = block;
  }
  block->size = size;
  block->next = NULL;
  block->free = 0;
  block->magic = 0x12345678;
  return block;
}
```

---

## Mise a jour de `malloc`

Notre version mise à jour de malloc intègre la réutilisation des blocs :

```c
void *malloc(size_t size) {
  struct block_meta *block;

  if (size <= 0) {
    return NULL;
  }

  if (!global_base) { // First call.
    block = request_space(NULL, size);
    if (!block) {
      return NULL;
    }
    global_base = block;
  } else {
    struct block_meta *last = global_base;
    block = find_free_block(&last, size);
    if (!block) {
      block = request_space(last, size);
      if (!block) {
        return NULL;
      }
    } else {
      block->free = 0;
      block->magic = 0x77777777;
    }
  }

  return (block + 1);
}
```

---

## Implementation de `free`

```c
struct block_meta *get_block_ptr(void *ptr) {
  return (struct block_meta*)ptr - 1;
}

void free(void *ptr) {
  if (!ptr) {
    return;
  }

  struct block_meta* block_ptr = get_block_ptr(ptr);
  assert(block_ptr->free == 0);
  assert(block_ptr->magic == 0x77777777 || block_ptr->magic == 0x12345678);
  block_ptr->free = 1;
  block_ptr->magic = 0x55555555;
}
```

---

## Ajout de `realloc` et `calloc`

### `realloc`

```c
void *realloc(void *ptr, size_t size) {
  if (!ptr) {
    return malloc(size);
  }

  struct block_meta* block_ptr = get_block_ptr(ptr);
  if (block_ptr->size >= size) {
    return ptr;
  }

  void *new_ptr = malloc(size);
  if (!new_ptr) {
    return NULL;
  }
  memcpy(new_ptr, ptr, block_ptr->size);
  free(ptr);
  return new_ptr;
}
```

### `calloc`

```c
void *calloc(size_t nelem, size_t elsize) {
  size_t size = nelem * elsize;
  void *ptr = malloc(size);
  memset(ptr, 0, size);
  return ptr;
}
```

---

## Tester Allocator

```bash
clang -O0 -g -W -Wall -Wextra -shared -fPIC malloc.c -o malloc.so
```
