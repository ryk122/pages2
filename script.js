// script.js

// CSVファイルを読み込む関数
async function loadCSV(filePath) {
    const response = await fetch(filePath);
    const data = await response.text();
    return parseCSV(data);
}
    

// CSVデータを解析する関数
function parseCSV(data) {
    const lines = data.trim().split('\n');
    const result = {};

    lines.forEach(line => {
        const [name, affiliation, years] = line.split(',');

        // 所属ごとにグループ化
        if (!result[affiliation]) {
            result[affiliation] = [];
        }
        result[affiliation].push(name);
    });

    return result;
}

// 所属データをHTMLに表示する関数
function displayAffiliations(data) {
    const container = document.getElementById('affiliations');
    for (const [affiliation, names] of Object.entries(data)) {
        const section = document.createElement('div');
        section.innerHTML = `<h2>${affiliation}</h2><ul>${names.map(name => `<li>${name}</li>`).join('')}</ul>`;
        container.appendChild(section);
    }
}

// 実行


loadCSV('database.csv').then(data => {
    displayAffiliations(data);
}); 


/* serverなし
const data = `
mami,mitakihara,3
madoka,mitakihara,1
homura,mitakihara,10
iroha,kamihama,1
yachiyo,kamihama,8`;

result = parseCSV(data)
displayAffiliations(result);

*/