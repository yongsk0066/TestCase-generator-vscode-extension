const languageFormat = (lang: string, type: string, cases: any) => {
    switch (lang) {
        case "python":
            return `testCase = [${cases.join(", ")}]`;
            break;
        case "javascript":
            return `const testCase = [${cases.join(", ")}]`;
            break;
        case "java":
            if (type === "string") {
                return `String[] testCase = {${cases.join(", ")}}`;
            } else {
                return `int[] testCase = {${cases.join(", ")}}`;
            }
            break;
        case "c++":
            if (type === "string") {
                return `char testcase[] = {${cases.join(", ")}}`;
            } else {
                return `int testcase[] = {${cases.join(", ")}}`;
            }
            break;
        default:
            break;
    }
};

function getRandomRange(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateString(rangeStr: string) {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    let range = rangeStr.split("-");
    let len = getRandomRange(Number(range[0]), Number(range[1]));
    let result = "";
    const charactersLength = chars.length;
    for (let i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * charactersLength));
    }

    return `"${result}"`;
}

function generateNumber(rangeStr: string) {
    let range = rangeStr.split("-");
    return getRandomRange(Number(range[0]), Number(range[1]));
}

function getCaseArr(type: string, iter: number, range: string) {
    let result = [];
    for (let i = 0; i < iter; i++) {
        if (type === "string") {
            result.push(generateString(range));
        } else if (type === "number") {
            result.push(generateNumber(range));
        } else {
            return ["Error"];
        }
    }
    return result;
}

export const gen = (config: string) => {
    const configArr = config.split("/");
    const language = configArr[0].toLowerCase();
    // python, javascript, java, c++
    const type = configArr[1].toLowerCase();
    // string, number,
    const iteration = Number(configArr[2]);
    // 1 ~ 20
    const range = configArr[3];
    // string 1-50
    // number 1-1000
    let generatedCase = getCaseArr(type, iteration, range);
    let result = languageFormat(language, type, generatedCase);
    return result;
};
