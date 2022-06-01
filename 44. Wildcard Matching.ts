function isMatch2(s: string, p: string): boolean {
  if (s === "" || p === "*") return true;

  let patternIndex = 0;
  let j = 0;

  const backtracking: { i: number; j: number }[] = [];

  for (let i = 0; i < s.length; i++) {
    patternIndex = i - j;

    console.log(i, s[i], "i - s[i]");
    console.log(
      patternIndex,
      p[patternIndex],
      "patternIndex - p[patternIndex]"
    );
    console.log("------");
    if (s[i] === p[patternIndex] || "?" === p[patternIndex]) {
      if (p[patternIndex - 1] == "*") {
        console.log("backtracking because of - 1 * ", i, j - 1);
        backtracking.push({ i: i, j: j - 1 });
      }
      continue;
    } else {
      if (p[patternIndex] === "*") {
        console.log("SETTING BACKTRACK!!!!");
        backtracking.push({ i, j });
        i = i - 1;
        j = j - 1;
        continue;
      } else if (p[patternIndex - 1] === "*") {
        j = j + 1;
        continue;
      } else if (backtracking.length > 0) {
        console.log("!!!backTracking!!", i, j);
        const positionToBacktrackTo = backtracking.pop();
        i = positionToBacktrackTo.i;
        j = positionToBacktrackTo.j;
        continue;
      } else return false;
    }
  }

  if (p[patternIndex + 1] == undefined) return true;
  if (p[patternIndex + 1] === "*") return true;
  return false;
}

function isMatch(s: string, p: string): boolean {
  if (p === "*") return true;

  let j = 0;
  let i = 0;

  const backtracking: { i: number; j: number }[] = [];

  while (i < s.length) {
    console.log(s[i], `s[${i}]`);
    console.log(p[j], `p[${j}]`);
    if (s[i] === p[j] || p[j] === "?") {
      if (p[j - 1] === "*") backtracking.push({ i: i + 1, j: j });
      i += 1;
      j += 1;
      continue;
    } else {
      if (p[j] === "*") {
        backtracking.push({ i: i + 1, j: j + 1 });
        j += 1;
        continue;
      } else if (p[j - 1] === "*") {
        i += 1;
        continue;
      } else if (backtracking.length > 0) {
        const backtrackPosition = backtracking.pop();
        i = backtrackPosition.i;
        j = backtrackPosition.j;
        continue;
      } else return false;
    }
  }

  if (p[j] == undefined) return true;
  for (j; j < p.length; j++) if (p[j] !== "*") return false;
  if (p[j - 1] === "*" && p[j] == undefined) return true;
  return false;
}

console.log(isMatch("", "****"));
