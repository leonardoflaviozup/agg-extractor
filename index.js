import pkg from 'json-2-csv';
const { json2csv } = pkg;
import { readFileSync, writeFileSync } from 'fs';

try {
  const jsonString = readFileSync('./convos_itau_app_users.json');
  const data = JSON.parse(jsonString);

  const allData = [];

  data.promotions.forEach((conv) => {
    conv.etl_aggregations.forEach((etl) => {
      const data = {
        conversa: conv.name,
        nome_da_agregacao: etl.etl_aggregation_name,
        descricao_da_agregacao: etl.rule.description,
        variavel_da_agregacao:
          'rvars.agg.' + etl.rvar_object + '.' + etl.rvar_variable,
        codigo: JSON.stringify(etl.rule.code),
      };
      allData.push(data);
    });
  });
  
  json2csv(allData, (error, csv) => {
    if (error) {
      throw error;
    }

    writeFileSync('./agregacoes.csv', csv);
  });
} catch (error) {
  console.error(error);
}
