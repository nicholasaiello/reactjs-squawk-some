
const DEFAULT_MAX_SIZE = 250;

/**
 * Capped Stack Data Structure
 * TODO: abstract, or remove, date compare logic
 */
const MaxSizeStack = (items = [], maxSize = DEFAULT_MAX_SIZE) => {

  let arr = items;

  const isEmpty = () => (size() === 0);

  const size = () => ( arr.length );

  const get = (idx) => (
    idx >= 0 && idx < size() ? arr[idx] : null
  );

  const add = (item) => {
    arr.unshift(item);
  };

  const addAll = (items) => {
    if (isEmpty()) {
      arr = [...items];
    } else {
      const lastStatus = get(0),
        lastStatusDate = Date.parse(lastStatus.created_at);

      for (let i = items.length - 1; i >= 0; i--) {
          const obj = items[i];
          // TODO add comparator?
          if (Date.parse(obj.created_at) > lastStatusDate) {
            add(obj);
          }
      }

      const diff = size() - maxSize;
      if (diff > 0) {
        arr.splice(0, maxSize);
      }

    }
  };

  const remove = () => ( arr.pop() );

  const clear = () => {
    arr = null;
    arr = [];
  };

  const clone = () => {
    // this will not properly clone objects w/
    // more than 1 level (nested)
    return MaxSizeStack(arr.slice(), maxSize);
  };

  const toArray = () => ( arr )

  return {
    size,
    // TODO don't need it
    contains: () => {},
    isEmpty,
    get,
    add,
    addAll,
    remove,
    clear,
    clone,
    toArray
  };

};

export default MaxSizeStack;
