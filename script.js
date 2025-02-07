document.addEventListener("DOMContentLoaded", () => {
    const totalPeopleInput = document.getElementById("totalPeople");
    const prizesInput = document.getElementById("prizes");
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

    setConfigButton.addEventListener("click", () => {
        totalPeople = parseInt(totalPeopleInput.value, 10);
        initializePrizePool();
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
