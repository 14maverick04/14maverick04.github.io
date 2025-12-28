---
title : 'Livelock'
date : 2025-12-27T17:27:13-05:00
draft : false
image: '/images/profile.jpg'
tags: ["concurrency"]
---

## Epilogue
- In the world of concurrency, deadlock and starvation are pretty famous.

- > A deadlocked program is the one in which all the concurrent processes are waiting on on another.

- > Starvation is any situation where a concurrent process cannot get all the resources it needs to perform work.


- One can easily verify whether a deadlock can arise based on `Coffman Conditions` which can help to detect, prevent, and correct deadlocks.
    
    1. Mutual exclusion
    2. Wait for condition
    3. No premption
    4. Circular wait

- Broadly speaking starvation is a scenario where one or more greedy concurrent process is unfairly preventing some one or more concurrent processes from completing a task.



## Scenario

> Imagine you're in a hallway walking towards your friend, She moves to one side to let you pass, but you've just done the same. So you move to the other side, but she's also done the same. Imagine this going on forever, and you are in a `livelock`.

PS: Avoid narrow hallways!

### Definition:

- Livelocks are program that are actively performing concurrent operations, but these operations do nothing to move the state of the program forward.
- In my opinion livelocks are more difficult to spot than deadlocks simply because it can appear as if the program is doing some work.
- Looking at metrics such CPU utilization it might deceive that it was doing some work and but it is actual stuck in the narrow hallway.
- They are subset of `starvation` problems.

```Go
	cadence := sync.NewCond(&sync.Mutex{})
	go func() {
		for range time.Tick(1 * time.Millisecond) {
			cadence.Broadcast()
		}

	}()

	takeStep := func() {
		cadence.L.Lock()
		cadence.Wait()
		cadence.L.Unlock()
	}

	tryDir := func(dirName string, dir *int32, out *bytes.Buffer) bool {
		fmt.Fprintf(out, " %v", dirName)
		atomic.AddInt32(dir, 1)
		takeStep()
		if atomic.LoadInt32(dir) == 1 {
			fmt.Fprint(out, ". Success!")
			return true
		}
		takeStep()
		atomic.AddInt32(dir, -1)
		return false
	}

	var left, right int32

	tryLeft := func(out *bytes.Buffer) bool {
		return tryDir("left", &left, out)
	}
	tryRight := func(out *bytes.Buffer) bool {
		return tryDir("right", &right, out)
	}

  walk := func(walking *sync.WaitGroup, name string){

  var out bytes.Buffer
  defer func(){fmt.Println(out.String())}()
  

  defer walking.Done()
  fmt.Fprintf(&out,"%v is trying to scoot:",name)
    for range 5 {
    if tryLeft(&out) || tryRight(&out){
      return
    }
  }
  // the below conditions were totally unecessary
  // I thought Sheldon might be particular about his pronouns
  // and the same goes with Amy as well
  
  if name == "Sheldon"{
      fmt.Fprintf(&out,"\n%v tosses he hands up in exasperation!",name)

  }else {
        fmt.Fprintf(&out,"\n%v tosses she hands up in exasperation!",name)
  }
  }

  var peopleInHallway sync.WaitGroup
  peopleInHallway.Add(2)
  go walk(&peopleInHallway,"Sheldon")
  go walk(&peopleInHallway,"Amy")
  peopleInHallway.Wait()

```

### Code In Action
- To run the above code, click on this link [Go Playground - Livelock](https://go.dev/play/p/zb0DiqwdAX8)

---

## References
- [Book: Concurrency in Go by Katherine Cox-Buday](https://katherine.cox-buday.com/concurrency-in-go/)
- [Youtube: Core Dumped](https://www.youtube.com/@CoreDumpped)
