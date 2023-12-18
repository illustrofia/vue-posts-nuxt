export interface Stack<T> {
  push: (value: T) => void
  pop: () => T | undefined
  peek: () => T | undefined
  size: () => number
  deleteFromIndex: (index: number) => void
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
    push,
    pop,
    peek,
    size,
    deleteFromIndex,
    toArray
  }
}
