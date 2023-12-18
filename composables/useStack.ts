export interface Stack<T> {
  deleteFromIndex: (index: number) => void
  peek: () => T | undefined
  pop: () => T | undefined
  push: (value: T) => void
  size: () => number
  toArray: () => T[]
}

export const useStack = <T>(): Stack<T> => {
  const stack: Ref<T[]> = ref([])

  function push(item: T) {
    stack.value.push(item)
  }

  const pop = () => {
    return stack.value.pop()
  }

  const peek = () => {
    return stack.value[stack.value.length - 1]
  }

  const size = () => {
    return stack.value.length
  }

  const deleteFromIndex = (index: number) => {
    stack.value.splice(index)
  }

  const toArray = () => {
    return [...stack.value]
  }

  return {
    deleteFromIndex,
    peek,
    pop,
    push,
    size,
    toArray
  }
}
