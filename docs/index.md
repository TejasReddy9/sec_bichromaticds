---
layout: default
---

# Overview
In this project we have implemented of an example of Bichromatic data structures i.e, smallest enclosed circle problem. A large set of points which can take any of the two types of colours is given and as a result we would form a circle which covers maximum number of points of the same colour in the same plane. 

## Requirements
The Computational Geometry Algorithms Library ([CGAL](https://www.cgal.org/download.html)). 
```
pip3 install cgal-bindings
```

## Research Papers referred
1.  Aritra Banik, E.M. Arkin, M.J. Katz, J.S. Mitchell, P. Carmi, _“Conflict-free covering”_, CCCG 2015, Kingston.
2.  Steven Bitner, Yam Cheung, Ovidiu Daescu, _“Minimum separating circle for bichromatic points in the plane”_, University of Texas at Dallas.
3.  CGAL Bounding volumes library manual, _“http://doc.cgal.org/latest/Bounding_volumes/index.html"_

## Possible applications using this concept
*   Communication Jamming
*   Minimizing Civilian casualities
*   Data set seperation

## Algorithm time complexity
```
O(m(n+m)log(n+m))
```
where, m = Size of red data points, and n = Size of blue data points

## Additional Algorithms insights
*   Farther Neighbour Voronoi Diagram
*   Largest Seperating Circle

## Project demo page link
[Webapp link](../page.html)
