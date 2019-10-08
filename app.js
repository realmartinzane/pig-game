var scores, roundScore, activePlayer, gamePlaying, lastRoll, finalScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function()
{
    if(!gamePlaying) return;
    
    var dice = Math.floor(Math.random() * 6) + 1;

    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    if (dice == 6 && lastRoll == 6) 
    {
        scores[activePlayer] = 0;
        document.getElementById('score-' + activePlayer).textContent = '0';
        nextPlayer();

    }
    else if (dice != 1)
    {
        roundScore += dice;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    }
    else 
        nextPlayer();

    lastRoll = dice;
});

document.querySelector('.btn-hold').addEventListener('click', function()
{
    if(!gamePlaying) return;

    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    if (scores[activePlayer] >= finalScore)
    {
        document.getElementById('name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    }
    else 
        nextPlayer();
    
});

document.querySelector('.btn-new').addEventListener('click', init);

function init()
{
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    lastRoll = 0;
    
    inputScore = document.querySelector('.final-score').value;
    if(inputScore > 0 && inputScore < 1000) 
        finalScore = inputScore;
    else
        finalScore = 100;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() 
{
    activePlayer = activePlayer == 0 ? 1 : 0;
    roundScore = 0;
    lastRoll = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}