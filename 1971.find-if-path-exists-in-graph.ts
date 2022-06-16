/*
 * @lc app=leetcode id=1971 lang=typescript
 *
 * [1971] Find if Path Exists in Graph
 */

// @lc code=start
function validPath(
  n: number,
  edges: number[][],
  source: number,
  destination: number
): boolean {
  if (destination > n) return false;
  function createEdgesMap() {
    const map: { [key: number]: number[] } = {};
    edges.forEach((edge, index) => {
      if (map[edge[0]] == undefined) map[edge[0]] = [];
      if (map[edge[1]] == undefined) map[edge[1]] = [];

      map[edge[0]].push(edge[1]);
      map[edge[1]].push(edge[0]);
    });
    return map;
  }

  const edgesMap = createEdgesMap();
  const visitedVertexMap: { [key: number]: boolean } = {};

  // DFS
  function findValidPathToDestination2(source: number) {
    if (source === destination) return true;
    if (visitedVertexMap[source] === true) return false;
    visitedVertexMap[source] = true;

    for (const sibling of edgesMap[source] || []) {
      if (findValidPathToDestination2(sibling) === true) return true;
    }

    return false;
  }

  // BFS
  const queue = [source];
  while (queue.length > 0) {
    const current = queue.pop();
    if (current === destination) return true;
    if (visitedVertexMap[current] === true) continue;
    visitedVertexMap[current] = true;

    for (const sibling of edgesMap[source] || []) {
      if (visitedVertexMap[sibling] !== true) queue.push(sibling);
    }
  }

  return false;

  // return function and trigger for first one -> DFS
  //return findValidPathToDestination(source)
}

/* 
  
  createEdgesmap
  Interate through array
  if edge[i][0] doesnt have array -> edge[i][0] = []
  if edge[i][1] doesnt have array -> edge[i][1] = []
  edge[i][0].push(edge[i][1])
  edge[i][1].push(edge[i][0])
    edgesMap -> number -> number[]
    visitedVertexMap -> number -> true
    
    - findValidPathToDestination DFS
    - Check if current = destination -> return true
    - if current already visited -> return false
    - Set visited
    - Find sibling vertexes
    - Repeat process for them
      - if(findValfindValidPathToDestinationidPath(sibling) === true) return true -> 
  
    return false
  
  while(queue.length >0) {
    const current = queue.pop()
    if (current === destination) return true
    if (visitedVertexMap[current] === true) continue
    visitedVertexMap[current] = true
  
    for(const sibling of (edgesMap[source] || [])) {
      if (visitedVertexMap[sibling] !== true) queue.push(sibling)
  }
  
  }
  
  return false
  
   - findValidPathToDestination BFS
  - while queue > 0
  - current = queue.pop()   5 | 4 
    - Check if current = destination -> return true
    - if current already visited -> continue
    - Set visited /* 5 | 4 
    - Find sibling vertexes  4 | 2, 6, 5, 8, 1, 0
    - queue.push(siblings)  – maybe transform in set /* [2, 6, 8, 1, 0] 
  
    return false
  */

// @lc code=end
