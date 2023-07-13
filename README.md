# Getting Started

This does not presently show an issue. Maybe a WIP but maybe the wrong avenue.

~~~bash
git clone https://github.com/lcnetdev/ml-sparql-queries.git
cd ml-perf-issue
./get_source_data
~~~

At this point you will need to modify at least one file to get going:

~~~bash
cp config.default config
~~~

And modify it as needed to enter your ML (admin) username and password and 
database of choice, if not the Documents database, and authentication method,
again if necessary.  You may need to increase the timeout on the application
server to load these datasets.

Then...
~~~bash
./load_data
~~~

Then...
~~~bash
./get_uris
~~~

And run the tests, for which see below.

# Tests

- [known-relations-from-uri](queries/known-relations-from-uri.sparql)
- [known-relations](queries/known-relations.sparql)
- [unknown-relations](queries/unknown-relations.sparql)

# Sample commands

~~~bash
time ./perf_test known-relations-from-uri
~~~
~~~bash
time ./perf_test known-relations
~~~
~~~bash
time ./perf_test unknown-relations
~~~

# Results

- None presently.

# Notes

These performance tests were developed to explore an issue with ML11.2

# Cleaning up

~~~bash
./cleanup_source_data
~~~
Simply deletes unnecessary data from disk.

~~~bash
./delete_data
~~~
Removes the graph from the database.
