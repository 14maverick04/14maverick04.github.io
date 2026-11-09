---
title : 'Time, Clocks, and the Ordering of Events'
date : 2026-09-19T12:00:00-04:00
draft : true
image: '/images/og-card.jpg'
tags: ["distributed-systems"]
---

## Motivation

`TLDR`: I want to write... 

- I have been reading reseach papers around various topics such as systems, philosophy, human psychology from past my few years (_~2015_). Advent of LLMs has affected my ability to write in negative way. It made me blunt when it comes to write something - I am not a Luddite. The epiphany to write something in my own words came while attending a lecture at my university - when it comes to written content slop takes major chunk of `Bell Curve` around the mean whereas the tails on either ends are domainted by either novice or experts.

- Recently I came across this [post](https://news.ycombinator.com/item?id=49699158) on HN. It covers most of papers which I have either read or present in my reading list. So from now on, I will be sharing my notes on this site. 



## Epilogue

- Notes from Leslie Lamport's 1978 paper, *Time, Clocks, and the Ordering of Events in a Distributed System*.

- > A distributed system consists of a collection of distinct processes which are spatially separated, and which communicate with one another by exchanging messages.

- In such a system there is no single global clock, so "which event happened first?" is not always answerable. The paper replaces physical time with a *logical* ordering of events.


## Happened-Before (→)

- The relation `→` is the smallest relation satisfying:

    1. If `a` and `b` are events in the same process and `a` comes before `b`, then `a → b`.
    2. If `a` is the sending of a message and `b` is the receipt of that same message, then `a → b`.
    3. If `a → b` and `b → c`, then `a → c` (transitivity).

- Two events are **concurrent** if neither `a → b` nor `b → a`. So `→` is only a *partial* order.


## Logical Clocks

- A clock `Cᵢ` assigns a number to each event in process `Pᵢ`. It has nothing to do with physical time.

- **Clock Condition:** for any events `a`, `b`: if `a → b` then `C(a) < C(b)`.
    - The converse does *not* hold — `C(a) < C(b)` does not imply `a → b`.

- Implementation rules:
    - **IR1:** Each process increments its clock between any two successive events.
    - **IR2:** A message carries the sender's timestamp `Tm`. On receipt, the receiver sets its clock to something greater than both its current value and `Tm`.


## Total Ordering

- Break ties between equal timestamps using an arbitrary total order on processes (e.g. process id). This gives a total order `⇒` consistent with `→`.

- The total order is not unique, but every process agrees on it — which is enough to solve problems like distributed mutual exclusion.


## Mutual Exclusion

<!-- TODO: add your highlights on the request/release queue algorithm -->


## Anomalous Behavior & Physical Clocks

<!-- TODO: add your highlights on external causality and synchronized physical clocks -->


## Code

<!-- TODO: Go implementation of a Lamport clock -->


## References
- [Leslie Lamport. *Time, Clocks, and the Ordering of Events in a Distributed System*. Communications of the ACM, 21(7), 1978](https://lamport.azurewebsites.net/pubs/time-clocks.pdf)
