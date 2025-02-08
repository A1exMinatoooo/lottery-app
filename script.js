document.addEventListener("DOMContentLoaded", () => {
    const totalPeopleInput = document.getElementById("totalPeople");
    const toggleSettingsButton = document.getElementById("toggleSettings");
    const settingsPanel = document.getElementById("settingsPanel");
    const addPrizeButton = document.getElementById("addPrize");
    const prizeTableBody = document.querySelector("#prizeTable tbody");
    const setConfigButton = document.getElementById("setConfig");
    const drawButton = document.getElementById("drawButton");
    const resetButton = document.getElementById("resetPool");
    const prizeList = document.getElementById("prizeList");
    const resultText = document.getElementById("result");

    let totalPeople = parseInt(totalPeopleInput.value, 10);
    let prizePool = [];

    function updatePrizeList() {
        const prizeCount = prizePool.reduce((acc, prize) => {
            acc[prize] = (acc[prize] || 0) + 1;
            return acc;
        }, {});

        prizeList.textContent = "剩余奖品：" + Object.entries(prizeCount)
            .map(([prize, count]) => `${prize}（${count}个）`)
            .join("、");
    }

    function savePrizePool() {
        localStorage.setItem("prizePool", JSON.stringify(prizePool));
    }

    function loadPrizePool() {
        const savedPool = localStorage.getItem("prizePool");
        if (savedPool) {
            prizePool = JSON.parse(savedPool);
            updatePrizeList();
        }
    }

    function initializePrizePool(save = true) {
        prizePool = [];
        let totalPrizes = 0;

        const prizeRows = prizeTableBody.querySelectorAll("tr");
        prizeRows.forEach(row => {
            const name = row.cells[0].querySelector("input").value.trim();
            const count = parseInt(row.cells[1].querySelector("input").value, 10);
            if (name && count > 0) {
                for (let i = 0; i < count; i++) {
                    prizePool.push(name);
                }
                totalPrizes += count;
            }
        });

        const noPrizeCount = totalPeople - prizePool.length;
        for (let i = 0; i < noPrizeCount; i++) {
            prizePool.push("未中奖");
        }

        updatePrizeList();
        if (save) savePrizePool();
    }

    toggleSettingsButton.addEventListener("click", () => {
        settingsPanel.classList.toggle("show");
    });

    resetButton.addEventListener("click", () => {
        localStorage.removeItem("prizePool");
        initializePrizePool(false);
    });

    loadPrizePool();

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

        resultText.textContent = drawnPrize === "未中奖" ? "很遗憾，没有中奖" : `恭喜！你抽中了: ${drawnPrize}`;
        updatePrizeList();
    });

    initializePrizePool();
});
