'use strict';
const op = require('/MarkLogic/optic');

let query=`PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
SELECT { ?s ?p ?o } 
WHERE {
	?s madsrdf:isMemberOfMADSScheme <http://id.loc.gov/authorities/childrensSubjects> .
	?s ?p ?o .
}`
op.fromSPARQL(query);

