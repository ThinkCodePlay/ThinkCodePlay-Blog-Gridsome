---
title: "What is an Interface in C# and how to use it?"
date: "2021-05-13"
categories: 
  - "c"
  - "object-oriented-programming"
  - "tutorial"
tags: 
  - "c"
  - "interface"
  - "oop"
cover: "/static/from-blog/cover-images/15.png"  
---

In this tutorial we will learn what is an interface in C# is a core concept of object oriented programing. But what is it and why should you use it?

## What is an Interface?

According to [Microsoft C# documentation:](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/interface)

> An interface defines a contract. Any [`class`](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/class) or [`struct`](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/struct) that implements that contract must provide an implementation of the members defined in the interface.
> 
> <https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/interface>

In other words, if you need to have a set of functionality to be enforced on a class or struct you can use the interface and implement the functionality in the class.

The interface is basically a scaffolding of properties and methods that a class must implement.

## Why should you use it?

OK so we understand that an interface is just a contract that enforces any class that uses it to be implemented. But when would you use it?

Let's say we are creating a game with many players. At the core they should all have something that's common to them all, and some properties that are different. For example all players should have Health, Damage and Speed property and they can call a move and attack methods that are implemented differently. We could use an interface on all players in the game and call the same function but each one would output different results.

## How to implement it?

We will create a basic C# console application and create a file IEnemy:

```csharp
namespace InterfaceTutorial
{
    interface IEnemy
    {
        float Hit { get; set; }
        float Health { get; set; }
        float Speed { get; set; }
        void Attack();
        void Move();
    }
}
```

Notice that the convention is to use a capital I for the name of the interface. Also since all members of an interface must be public then you don't need explicitly make it public.

So we created 3 properties and 2 function. We will now create 3 different player classes the will use the interface:

```csharp
    class Mage : IEnemy
    {
        public float Hit { get; set; } = 5;
        public float Health { get; set; } = 10;
        public float Speed { get; set; } = 15;

        public float Mana { get; set; }
        public void Attack()
        {
            Console.WriteLine($"Mage send a giant fire ball doing { Hit } damage!");
        }

        public void Move()
        {
            Console.WriteLine($"Mage pulls his robes and runs at { Speed } meters away");
        }

        public void Meditate()
        {
            Console.WriteLine($"Mage meditaes and now has { Mana } mana!");
        }

    }
```

After declaring the class name we use the : symbol and then enter the interface name to use.

Notice that if you do not implement all fields from the interface you will get an error telling you what wasn't implemented.

Here's the Next two player classes:

```csharp
    class Knight : IEnemy
    {
        public float Hit { get; set; } = 10;
        public float Health { get; set; } = 15;
        public float Speed { get; set; } = 5;

        public float Armor { get; set; }

        public void Attack()
        {
            Console.WriteLine($"Knight slashes his two handed sword for { Hit } points of damage!");
        }

        public void Move()
        {
            Console.WriteLine($"Knight slowly moves his in his sturdy armor { Speed } meters away");
        }

        public void Protection()
        {
            Console.WriteLine($"Knight has { Armor } added protection");
        }

    }


    class Thief : IEnemy
    {
        public float Hit { get; set; } = 5;
        public float Health { get; set; } = 5;
        public float Speed { get; set; } = 15;

        public void Attack()
        {
            Console.WriteLine($"Thief pulls his two daggers doing { Hit } points of damage!");
        }

        public void Move()
        {
            Console.WriteLine($"Thief quietly sneaks away unnoticed { Speed } meters away");
        }

    }
```

To invoke them we can now loop over the players and call their methods.

```csharp
using System;
using System.Collections.Generic;

namespace InterfaceTutorial
{
    class Program
    {
        static void Main(string[] args)
        {
            List<IEnemy> players = new List<IEnemy>();
            players.Add(new Mage());
            players.Add(new Knight());
            players.Add(new Thief());

            foreach (IEnemy player in players)
            {
                player.Attack();
                player.Move();
            }
        }
    }
}
```

In this example we created a list of the interface IEnemy. This means that any class inserted into the list must adhere to the contract of IEnemy.

We loop over the list of players and we can call the methods and properties that they implemented from the interface. Notice that you can't call any methods or properties.

## Conclusion

In this tutorial we learned that in interface is a contract that enforces classes that use it to use its methods and properties.

We created 3 different classes that used the interface and implemented the methods and properties differently, And we looped over a list with these different classes but called the same functions that were implemented differently.

[Source code can be found here.](https://github.com/ThinkCodePlay/Csharp-Interface-Tutorial)

Hope you enjoyed this tutorial. Feel free to comment if you found this interesting or have something to add.
