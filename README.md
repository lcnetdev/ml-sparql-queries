# Getting Started

*** NOT UPDATED.  WIP ****

~~~bash
git clone https://github.com/kefo/ml-sparql-issue.git
cd ml-perf-issue
./get_source_data
~~~

At this point you will need to modify at least one file to get going:

~~~bash
cp config.default config
~~~

And modify it as needed to enter your ML (admin) username and password and 
database of choice, if not the Documents database, and authentication method,
again if necessary.

Then...
~~~bash
./load_data
~~~

And run the tests, for which see below.

# Tests

- [filter_query_good](queries/filter_query_good.sparql)
- [filter_query_bad](queries/filter_query_bad.sparql)

- [values_query_good](queries/values_query_good.sparql)
- [values_query_bad](queries/values_query_bad.sparql)
- [values_query_better_but](queries/values_query_better_but.sparql)

# Sample commands

~~~bash
time ./perf_test filter_query_good
~~~
~~~bash
time ./perf_test filter_query_bad
~~~
~~~bash
time ./perf_test values_query_good
~~~
~~~bash
time ./perf_test values_query_bad
~~~

# Results

- [AWS ML9.0-10](results/aws-ml9.0-10.md)
- [LC ML8.0-7.1](results/lc-ml8.0-7.1.md)

# Notes

These performance tests were developed to explore an issue with ML9.0-10 set up 
in a three-node cluster in AWS.  The 'good' queries should perform well regardless of 
environment.  The 'bad' queries perform poorly in AWS on ML9.0-10.  Those 'bad' 
queries, however, will perform equally well, if not better, in ML8.0-7.1 on
VM hardware.  They also mimic actual, in-production queries used in the ML8 system, which 
is to say that the 'bad' queries are, in fact, the queries that need to perform 
well but which are not.

# About `filter_query`

The `filter_query` demonstrates that, in AWS on ML9, two FILTER statements that seek
to filter out unwanted hits performs poorly (the 'bad' one) but when you either remove the 
FILTER or reduce the number to a single FILTER (the 'good' one) then the queries 
perform as expected.

# About `values_query`

The `values_query` requires some background/understanding of the data.  Review 
the SPARQL queries first. 

Nearly every resource in the dataset will have a `skos:broader` relationship.  Nearly 
every resource in the dataset will have one or more - and in some cases MANY - 
`skos:narrower` relationships.  Far fewer resources will have the other relationships
seen in the sparql query and a good many (probably the vast majority) will have 
none of those relationships.

When the `skos:broader` or `skos:narrower` values are removed (see the 'bad' query), 
performance declines substantially.  This can be mitigated somewhat by uncommenting
the ?scheme matches (better_but query).  This was included only because it was observed 
that removing those two lines from the SPARQL query could improve performance 
substantially over the "bad" query.  Though those lines appear to have no bearing 
on the real culprit - the 'values' section - it was striking that eliminating those
conditions would improve the performance in AWS ML9 by as much as it did. (See results)

# Cleaning up

~~~bash
./cleanup_source_data
~~~
Simply deletes unnecessary data from disk.

~~~bash
./delete_data
~~~
Removes the graph from the database.
