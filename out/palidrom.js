function validPalindrome(s, noErrorAllowed) {
    if (noErrorAllowed === void 0) { noErrorAllowed = false; }
    var i = 0;
    var j = s.length - 1;
    var halfLength = Math.trunc(s.length / 2);
    debugger;
    while (i <= halfLength && j >= halfLength) {
        if (s[i] !== s[j]) {
            if (noErrorAllowed)
                return false;
            if (i + 1 <= halfLength && s[i + 1] === s[j]) {
                if (validPalindrome(s.substring(i + 1, j + 1), true))
                    return true;
            }
            if (j - 1 >= halfLength && s[i] === s[j - 1]) {
                return validPalindrome(s.substring(i, j), true);
            }
            else {
                return false;
            }
        }
        i++;
        j--;
    }
    return true;
}
console.log(validPalindrome("eeccccbebaeeabebccceea"));
console.log(validPalindrome("abba"));
console.log(validPalindrome("aba"));
console.log(validPalindrome("acbca"));
console.log(validPalindrome("axcbca"));
console.log(validPalindrome("acbxca"));
console.log(validPalindrome("aguokepatgbnvfqmgmlcupuufxoohdfpgjdmysgvhmvffcnqxjjxqncffvmhvgsymdjgpfdhooxfuupuculmgmqfvnbgtapekouga"));
//# sourceMappingURL=palidrom.js.map