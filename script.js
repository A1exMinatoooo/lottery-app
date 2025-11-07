document.addEventListener("DOMContentLoaded", () => {
    const totalPeopleInput = document.getElementById("totalPeople");
    const lotteryTitleInput = document.getElementById("lotteryTitleInput");
    const lotteryTitle = document.getElementById("lotteryTitle");
    const toggleSettingsButton = document.getElementById("toggleSettings");
    const settingsPanel = document.getElementById("settingsPanel");
    const addPrizeButton = document.getElementById("addPrize");
    const prizeTableBody = document.querySelector("#prizeTable tbody");
    const setConfigButton = document.getElementById("setConfig");
    const drawButton = document.getElementById("drawButton");
    const resetButton = document.getElementById("resetPool");
    const prizeList = document.getElementById("prizeList");
    const resultText = document.getElementById("result");

    let totalPeople, prizePool;
    
    // 预加载图片
    function preloadImages() {
        const images = [
            'assets/atari.png',
            'assets/hazure.png',
            'assets/loading.gif'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // 页面加载时预加载图片
    preloadImages();

    function updatePrizeList() {
        const prizeCount = prizePool.reduce((acc, prize) => {
            acc[prize] = (acc[prize] || 0) + 1;
            return acc;
        }, {});

        const totalPrizes = totalPeople;
        const remainingPrizes = prizePool.length;
        
        prizeList.textContent = `计数: ${remainingPrizes} / ${totalPrizes}`;
        
        // 在设置面板内显示奖品剩余数量
        let settingsPrizeList = document.getElementById("settingsPrizeList");
        if (!settingsPrizeList) {
            settingsPrizeList = document.createElement("div");
            settingsPrizeList.id = "settingsPrizeList";
            settingsPanel.appendChild(settingsPrizeList);
        }
        
        let displayText = `奖品剩余数量:\n`;
        for (const [prize, count] of Object.entries(prizeCount)) {
            if (prize !== "未中奖") {
                displayText += `${prize}: ${count}\n`;
            }
        }
        settingsPrizeList.textContent = displayText;
    }

    function savePrizeSettings() {
        const prizeSettings = [];
        const prizeRows = prizeTableBody.querySelectorAll("tr");
        prizeRows.forEach(row => {
            const name = row.cells[0].querySelector("input").value.trim();
            const count = parseInt(row.cells[1].querySelector("input").value, 10);
            prizeSettings.push({name, count});
        });
        localStorage.setItem("prizeSettings", JSON.stringify(prizeSettings));
    }

    function loadPrizeSettings() {
        const savedSettings = localStorage.getItem("prizeSettings");
        if (savedSettings) {
            const prizeSettings = JSON.parse(savedSettings);
            prizeSettings.forEach(setting => {
                const newRow = document.createElement("tr");
                newRow.innerHTML = `
                    <td><input type="text" value="${setting.name}" placeholder="奖品名称"></td>
                    <td><input type="number" value="${setting.count}" min="1" placeholder="数量"></td>
                    <td><button class="removePrize">删除</button></td>
                `;
                prizeTableBody.appendChild(newRow);
            });
        }
    }

    function savePrizePool() {
        localStorage.setItem("totalPeople", totalPeople);
        localStorage.setItem("prizePool", JSON.stringify(prizePool));
        savePrizeSettings();
    }

    function loadPrizePool() {
        const savedTotal = localStorage.getItem("totalPeople");
        if (savedTotal) {
            totalPeople = parseInt(savedTotal, 10);
            totalPeopleInput.value = totalPeople;
        } else {
            totalPeople = parseInt(totalPeopleInput.value, 10);
        }

        const savedTitle = localStorage.getItem("lotteryTitle");
        if (savedTitle) {
            lotteryTitle.textContent = savedTitle;
            lotteryTitleInput.value = savedTitle;
        }

        const savedPool = localStorage.getItem("prizePool");
        if (savedPool) {
            prizePool = JSON.parse(savedPool);
            updatePrizeList();
        } else {
            prizePool = [];
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

    // 为奖品设置界面添加关闭按钮
    const closeSettingsButton = document.createElement("button");
    closeSettingsButton.innerHTML = "&#10006;"; // 使用HTML实体表示关闭图标
    closeSettingsButton.className = "close-settings";
    closeSettingsButton.addEventListener("click", () => {
        settingsPanel.classList.remove("show");
    });
    settingsPanel.insertBefore(closeSettingsButton, settingsPanel.firstChild);

    resetButton.addEventListener("click", () => {
        localStorage.removeItem("totalPeople");
        localStorage.removeItem("prizePool");
        localStorage.removeItem("prizeSettings");
        prizeTableBody.innerHTML = "";
        initializePrizePool(false);
    });

    loadPrizePool();
    loadPrizeSettings();

    addPrizeButton.addEventListener("click", () => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td><input type="text" value="新奖品" placeholder="奖品名称"></td>
            <td><input type="number" value="1" min="1" placeholder="数量"></td>
            <td><button class="removePrize">删除</button></td>
        `;
        prizeTableBody.appendChild(newRow);
        updateTotalPeopleFromPrizes();
    });

    prizeTableBody.addEventListener("click", (event) => {
        if (event.target.classList.contains("removePrize")) {
            event.target.closest("tr").remove();
            updateTotalPeopleFromPrizes();
        }
    });

    // 监听奖品数量变化，判断是否需要更新总人数
    function updateTotalPeopleFromPrizes() {
        let totalPrizes = 0;
        const prizeRows = prizeTableBody.querySelectorAll("tr");
        prizeRows.forEach(row => {
            const countInput = row.cells[1].querySelector("input");
            const count = parseInt(countInput.value, 10);
            if (!isNaN(count) && count > 0) {
                totalPrizes += count;
            }
        });
        
        const currentTotalPeople = parseInt(totalPeopleInput.value, 10);
        // 只有当奖品数量大于当前总人数时，才更新总人数
        if (totalPrizes > currentTotalPeople) {
            totalPeopleInput.value = totalPrizes;
        }
    }

    // 为每个奖品数量输入框添加事件监听
    prizeTableBody.addEventListener("input", (event) => {
        if (event.target.type === "number") {
            updateTotalPeopleFromPrizes();
        }
    });

    setConfigButton.addEventListener("click", () => {
        const newTitle = lotteryTitleInput.value.trim();
        lotteryTitle.textContent = newTitle;
        localStorage.setItem("lotteryTitle", newTitle);
        const prizeRows = prizeTableBody.querySelectorAll("tr");
        let prizeData = [];
        let totalPrizeCount = 0;

        prizeRows.forEach(row => {
            const name = row.cells[0].querySelector("input").value.trim();
            const count = parseInt(row.cells[1].querySelector("input").value, 10);
            if (name && count > 0) {
                for (let i = 0; i < count; i++) {
                    prizeData.push(name);
                }
                totalPrizeCount += count;
            }
        });

        // 获取当前总人数
        totalPeople = parseInt(totalPeopleInput.value, 10);
        
        // 如果奖品数量大于总人数，自动更新总人数
        if (totalPrizeCount > totalPeople) {
            totalPeople = totalPrizeCount;
            totalPeopleInput.value = totalPeople;
        }

        prizePool = [...prizeData];
        const noPrizeCount = totalPeople - prizePool.length;
        for (let i = 0; i < noPrizeCount; i++) {
            prizePool.push("未中奖");
        }

        updatePrizeList();
        savePrizePool();
    });

    // 创建遮罩层
    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    overlay.style.display = "none"; // 初始隐藏
    document.body.appendChild(overlay);
    
    // 创建浮窗元素
    const resultPopup = document.createElement("div");
    resultPopup.className = "result-popup";
    resultPopup.style.display = "none"; // 初始隐藏
    
    // 创建图片元素
    const prizeImage = document.createElement("img");
    prizeImage.className = "prize-image";
    prizeImage.style.display = "none"; // 初始隐藏
    
    // 创建内容容器
    const content = document.createElement("div");
    content.className = "popup-content";
    
    // 添加关闭按钮容器
    const closeContainer = document.createElement("div");
    closeContainer.className = "close-container";
    
    // 添加关闭按钮
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "关闭";
    closeBtn.className = "close-btn";
    closeBtn.addEventListener("click", () => {
        resultPopup.style.display = "none";
        overlay.style.display = "none";
    });
    
    closeContainer.appendChild(closeBtn);
    
    // 组装浮窗结构
    resultPopup.appendChild(prizeImage);
    resultPopup.appendChild(content);
    resultPopup.appendChild(closeContainer);
    document.body.appendChild(resultPopup);

    let timeoutId; // 用于存储定时器ID

    drawButton.addEventListener("click", () => {
        // 清除之前的定时器
        clearTimeout(timeoutId);
        
        if (prizePool.length === 0) {
            content.textContent = "所有奖品已抽完！";
            prizeImage.style.display = "none";
            resultPopup.style.display = "block";
            overlay.style.display = "block";
            // 3秒后自动关闭弹窗
            timeoutId = setTimeout(() => {
                resultPopup.style.display = "none";
                overlay.style.display = "none";
            }, 3000);
            return;
        }

        // 显示加载框
        const loadingOverlay = document.getElementById("loadingOverlay");
        loadingOverlay.style.display = "flex";

        // 禁用抽奖按钮以防止重复点击
        drawButton.disabled = true;

        // 随机生成0.5秒到1.5秒的延迟时间
        const delay = Math.random() * 1000 + 500;

        timeoutId = setTimeout(() => {
            // 隐藏加载框
            loadingOverlay.style.display = "none";

            // 抽奖逻辑
            const randomIndex = Math.floor(Math.random() * prizePool.length);
            const drawnPrize = prizePool.splice(randomIndex, 1)[0];

            const resultText = drawnPrize === "未中奖" ? "很遗憾，没有中奖" : `恭喜！你抽中了: ${drawnPrize}`;
            content.textContent = resultText;
            
            // 根据中奖状态显示不同的图片
            if (drawnPrize === "未中奖") {
                prizeImage.src = "assets/hazure.png";
                prizeImage.alt = "未中奖";
            } else {
                prizeImage.src = "assets/atari.png";
                prizeImage.alt = "中奖";
            }
            prizeImage.style.display = "block";
            
            resultPopup.style.display = "block";
            overlay.style.display = "block";

            updatePrizeList();
            savePrizePool();

            // 重新启用抽奖按钮
            drawButton.disabled = false;
        }, delay);
    });

    if (!localStorage.getItem("prizePool")) {
        initializePrizePool();
    }
});
