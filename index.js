const breadsBtn = document.getElementById('breadsBtn');
const breadsListSection = document.getElementById('breadsList-section')
const breadsList = document.getElementById('breadsList')


const allBreads = []
fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(data => {
        let out = ''
        const keys = Object.keys(data.message)
        keys.forEach(eachBread => {
            allBreads.push(eachBread)
            i = 0;
            out += `
                <div class="col-lg-2">
                    <a href="#" class="btn btn-outline-primary mt-3" onClick="exe('${eachBread}')"">${eachBread}</a>
                </div>
            `;
            i += 1;
        });
        breadsList.innerHTML = out;
    })

async function exe(str) {
    console.log(str)
}