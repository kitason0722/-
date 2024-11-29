const buttonsContainer = document.getElementById('buttons-container');
const statusDiv = document.getElementById('status');

let buttons = Array(12).fill(true);
let turn = 1;
let player1Score = 0;
let player2Score = 0;
let player1Hits = 0;
let player2Hits = 0;

function renderButtons() {
    buttonsContainer.innerHTML = '';
    buttons.forEach((active, index) => {
        const button = document.createElement('button');
        button.textContent = active ? index + 1 : '済';
        button.className = `button ${active ? '' : 'disabled'}`;
        button.disabled = !active;
        button.onclick = () => handleInput(index + 1);
        buttonsContainer.appendChild(button);
    });
}

function handleInput(number) {
    const currentTurn = turn % 2 === 1 ? '後攻' : '先攻';
    if (currentTurn === '後攻') {
        player2Input = number;
        statusDiv.textContent = "先攻の人は表示されている数字の中から数字を選択してください。";
        turn++;
    } else {
        player1Input = number;
        processTurn();
    }
}

function processTurn() {
    if (player1Input === player2Input) {
        if (turn % 2 === 0) {
            player2Hits++;
            statusDiv.textContent = "後攻の防衛成功です!";
        } else {
            player1Hits++;
            statusDiv.textContent = "先攻の防衛成功です!";
        }
    } else {
        if (turn % 2 === 0) {
            player1Score += player1Input;
            buttons[player1Input - 1] = false;
            statusDiv.textContent = `後攻の防衛失敗です...先攻に${player1Input}点入りました!`;
        } else {
            player2Score += player2Input;
            buttons[player2Input - 1] = false;
            statusDiv.textContent = `先攻の防衛失敗です...後攻に${player2Input}点入りました!`;
        }
    }

    if (player1Score >= 40 || player2Score >= 40 || player1Hits === 3 || player2Hits === 3 || buttons.filter(b => b).length <= 1) {
        endGame();
        return;
    }

    turn++;
    renderButtons();
    statusDiv.textContent += `\n先攻の得点: ${player1Score}点 後攻の得点: ${player2Score}点`;
}

function endGame() {
    if (player1Hits === 3 || player1Score > player2Score) {
        statusDiv.textContent = "先攻の勝利です!!おめでとうございます!!";
    } else if (player2Hits === 3 || player2Score > player1Score) {
        statusDiv.textContent = "後攻の勝利です!!おめでとうございます！";
    } else {
        statusDiv.textContent = "今回は引き分けです...次は決着をつけましょう!";
    }
}

renderButtons();
statusDiv.textContent = "後攻の人は表示されている数字の中から数字を選択してください。";
