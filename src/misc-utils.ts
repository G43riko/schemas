export const kebabCaseToUpperCamelCase = (kebabCaseText: string): string => {
    return kebabCaseText
        .split('-') // Split the string by hyphens
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
        .join(''); // Join them back together
}