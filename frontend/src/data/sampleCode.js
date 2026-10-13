/**
 * Sample code snippets for Java and Python.
 * Used by the "Load Example" feature.
 */

export const sampleCode = {
  java: [
    {
      label: 'Hello World',
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    },
    {
      label: 'Even or Odd',
      code: `import java.util.Scanner;

public class EvenOdd {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int number = scanner.nextInt();

        if (number % 2 == 0) {
            System.out.println(number + " is even.");
        } else {
            System.out.println(number + " is odd.");
        }

        scanner.close();
    }
}`,
    },
    {
      label: 'Factorial (Loop)',
      code: `public class Factorial {
    public static void main(String[] args) {
        int num = 6;
        long factorial = 1;

        for (int i = 1; i <= num; i++) {
            factorial *= i;
        }

        System.out.println("Factorial of " + num + " is " + factorial);
    }
}`,
    },
    {
      label: 'Array Maximum',
      code: `public class ArrayMax {
    public static void main(String[] args) {
        int[] numbers = {12, 45, 7, 23, 89, 34, 56};
        int max = numbers[0];

        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] > max) {
                max = numbers[i];
            }
        }

        System.out.println("Maximum element: " + max);
    }
}`,
    },
  ],
  python: [
    {
      label: 'Hello World',
      code: `# Simple Hello World program
print("Hello, World!")`,
    },
    {
      label: 'Even or Odd',
      code: `# Check if a number is even or odd
number = int(input("Enter a number: "))

if number % 2 == 0:
    print(f"{number} is even.")
else:
    print(f"{number} is odd.")`,
    },
    {
      label: 'Factorial (Loop)',
      code: `# Calculate factorial using a loop
num = 6
factorial = 1

for i in range(1, num + 1):
    factorial *= i

print(f"Factorial of {num} is {factorial}")`,
    },
    {
      label: 'Array Maximum',
      code: `# Find the maximum element in a list
numbers = [12, 45, 7, 23, 89, 34, 56]
max_val = numbers[0]

for num in numbers[1:]:
    if num > max_val:
        max_val = num

print(f"Maximum element: {max_val}")`,
    },
  ],
};

export const supportedLanguages = [
  { value: 'java', label: 'Java' },
  { value: 'python', label: 'Python' },
];
