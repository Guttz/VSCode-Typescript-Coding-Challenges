/*
 * @lc app=leetcode id=937 lang=typescript
 *
 * [937] Reorder Data in Log Files
 */

// @lc code=start
function reorderLogFiles2(logs: string[]): string[] {
  const digitLogs: string[] = [];

  const letterLogs: string[] = [];

  logs.forEach((log, index) => {
    // It's digitLog - If last word is number, it should be a digitLog
    if (!isNaN(+log[log.length - 1])) digitLogs.push(log);
    else {
      letterLogs.push(log);
    }
  });

  letterLogs.sort((a, b) => {
    //const indexA = a.search((c) => c === " ")
    //const indexB = b.search((c) => c === " ")
    //const identifierA = a.substring(0, indexA)
    //const identifierA = a.substring(0, indexB)

    const [identifierA, ...logA] = a.split(" ");
    const [identifierB, ...logB] = b.split(" ");

    const reorderedA =
      logA.reduce((reorderedLog, word) => (reorderedLog += word + " "), "") +
      "aaa " +
      identifierA;
    const reorderedB =
      logB.reduce((reorderedLog, word) => (reorderedLog += word + " "), "") +
      "aaa " +
      identifierB;

    return reorderedA > reorderedB ? 1 : -1;
  });
  return [...letterLogs, ...digitLogs];
}

function reorderLogFiles(logs: string[]): string[] {
  const digitLogs: string[] = [];
  const letterLogs: { log: string; formated: string }[] = [];

  logs.forEach((log) => {
    // It's digitLog - If last word is number, it should be a digitLog
    if (!isNaN(+log[log.length - 1])) digitLogs.push(log);
    else {
      const [identifier, ...logContent] = log.split(" ");
      const formatedLog =
        logContent.reduce(
          (reorderedLog, word) => (reorderedLog += word + " "),
          ""
        ) +
        "aaa " +
        identifier;

      const indexToInsert = letterLogs.findIndex(
        (log) => formatedLog < log.formated
      );
      if (indexToInsert !== -1)
        letterLogs.splice(indexToInsert, 0, { log, formated: formatedLog });
      else letterLogs.push({ log, formated: formatedLog });
    }
  });

  return [...letterLogs.map((log) => log.log), ...digitLogs];
}

console.log(
  reorderLogFiles([
    "dig1 8 1 5 1",
    "let1 art zero can",
    "dig2 3 6",
    "let2 own kit dig",
    "let3 art zero",
  ])
);

// @lc code=end
