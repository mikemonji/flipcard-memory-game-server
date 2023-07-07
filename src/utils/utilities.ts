export function removeDuplicates(numbers: number[]): number[] {
    const uniqueNumbers: number[] = [];
    const numberSet: Set<number> = new Set();
  
    for (const num of numbers) {
      if (!numberSet.has(num)) {
        numberSet.add(num);
        uniqueNumbers.push(num);
      }
    }
  
    return uniqueNumbers;
}
  