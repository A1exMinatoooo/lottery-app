document.addEventListener("DOMContentLoaded", () => {
    const totalPeopleInput = document.getElementById("totalPeople");
    const prizesInput = document.getElementById("prizes");
    const toggleSettingsButton = document.getElementById("toggleSettings");
    const settingsPanel = document.getElementById("settingsPanel");
    const addPrizeButton = document.getElementById("addPrize");
    const prizeTableBody = document.querySelector("#prizeTable tbody");
    const setConfigButton = document.getElementById("setConfig");
    const drawButton = document.getElementById("drawButton");
    const prizeList = document.getElementById("prizeList");
    const resultText = document.getElementById("result");

    let totalPeople = parseInt(totalPeopleInput.value, 10);
    let prizePool = [];

    function updatePrizeList() {
        prizeList.innerHTML = "";
        const prizeCount = prizePool.reduce((acc, prize) => {
            acc[prize] = (acc[prize] || 0) + 1;
            return acc;
        }, {});

        Object.entries(prizeCount).forEach(([prize, count]) => {
            const li = document.createElement("li");
            li.textContent = `${prize}: ${count}个`;
            prizeList.appendChild(li);
        });
    }

    function initializePrizePool() {
        prizePool = [];
        const prizeEntries = prizesInput.value.split(",");
        let totalPrizes = 0;

        prizeEntries.forEach(entry => {
            const [name, count] = entry.split("-");
            const prizeCount = parseInt(count, 10);
            if (!isNaN(prizeCount) && prizeCount > 0) {
                for (let i = 0; i < prizeCount; i++) {
                    prizePool.push(name.trim());
                }
                totalPrizes += prizeCount;
            }
        });

        const noPrizeCount = totalPeople - totalPrizes;
        for (let i = 0; i < noPrizeCount; i++) {
            prizePool.push("未中奖");
        }

        updatePrizeList();
    }

    toggleSettingsButton.addEventListener("click", () => {
        settingsPanel.classList.toggle("show");
    });

    addPrizeButton.addEventListener("click", () => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td><input type="text" value="新奖品"></td>
            <td><input type="number" value="1" min="1"></td>
            <td><button class="removePrize">删除</button></td>
        `;
        prizeTableBody.appendChild(newRow);
    });

    prizeTableBody.addEventListener("click", (event) => {
        if (event.target.classList.contains("removePrize")) {
            event.target.closest("tr").remove();
        }
    });

    setConfigButton.addEventListener("click", () => {
        totalPeople = parseInt(totalPeopleInput.value, 10);
        const prizeRows = prizeTableBody.querySelectorAll("tr");
        let prizeData = [];

        prizeRows.forEach(row => {
            const name = row.cells[0].querySelector("input").value.trim();
            const count = parseInt(row.cells[1].querySelector("input").value, 10);
            if (name && count > 0) {
                for (let i = 0; i < count; i++) {
                    prizeData.push(name);
                }
            }
        });

        prizePool = [...prizeData];
        const noPrizeCount = totalPeople - prizePool.length;
        for (let i = 0; i < noPrizeCount; i++) {
            prizePool.push("未中奖");
        }

        updatePrizeList();
    });

    drawButton.addEventListener("click", () => {
        if (prizePool.length === 0) {
            resultText.textContent = "所有奖品已抽完！";
            return;
        }

        const randomIndex = Math.floor(Math.random() * prizePool.length);
        const drawnPrize = prizePool.splice(randomIndex, 1)[0];

        resultText.textContent = `恭喜！你抽中了: ${drawnPrize}`;
        updatePrizeList();
    });

    initializePrizePool();
});
