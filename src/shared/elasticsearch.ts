import { Client } from '@elastic/elasticsearch';

export const esClient = new Client({
  node: 'http://10.10.7.44:5001',
});