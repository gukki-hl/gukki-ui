interface Tree{
    id:string,
    label:string,
    children?:Tree[]
}

const getKey = (prefix:string,id:number)=>{
    return `${prefix}-${id}`;
}

export function useTreeVirtualTraversal(){
    const createData = (
        maxDeep: number,
        maxChildren: number,
        minNodesNumber: number,
        deep = 1,
        key = "node"
      ): Tree[] => {
        let id = 0;
        return Array.from({ length: minNodesNumber })
          .fill(deep)
          .map(() => {
            const childrenNumber =
              deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren);
            const nodeKey = getKey(key, ++id);
            return {
              id: nodeKey,
              label: nodeKey,
              children: childrenNumber
                ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
                : undefined,
            };
          });
      };
   const treeV2Data = createData(4,30,40)

   return {treeV2Data,createData}
}