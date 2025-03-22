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

        person = {name,years}

        result[affiliation].push(person);

        //result[affiliation]["person"].push(name);

    });

    return result;
}

// 所属データをHTMLに表示する関数
function displayAffiliations(data) {
    //console.log(data)

    const container = document.getElementById('affiliations');


    const section = document.createElement('div');  
    section.innerHTML = `
        <h2>新人</h2>
        <ul>
    `;
    for(const [affiliation,person] of Object.entries(data)){
        for (i = 0 ; i<person.length; i++) {
            if(person[i].years<2){
                section.innerHTML += `
                    <a href="res/${person[i].name}.png" data-lightbox="group"><img src="res/${person[i].name}.png" alt="" width="100"></a>&nbsp;
                `;
            }
        }
    }
    section.innerHTML += `</ul>`;
    container.appendChild(section);

    for (const [affiliation, person] of Object.entries(data)) {
        const section = document.createElement('div');
        
        section.innerHTML = `
            <h2>${affiliation}</h2>
            <ul>
            `;
        for (i = 0 ; i<person.length; i++) {
            section.innerHTML += `
                <a href="res/${person[i].name}.png" data-lightbox="group"><img src="res/${person[i].name}.png" alt="" width="100"></a>&nbsp;
            `;
        }
        section.innerHTML += `</ul>`;
        container.appendChild(section);
    }
}

//${names.map(name => `<img src="res/${name}.png" alt="${name}" class="popup"/>&nbsp;`).join('')}

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