document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#crypto-table tbody');
            tableBody.innerHTML = '';

            // Obtener el precio de Bitcoin (BTC)
            const bitcoin = data.find(crypto => crypto.symbol === 'btc');
            const bitcoinPrice = bitcoin.current_price;

            // Verificar la cantidad de datos recibidos
            if (data.length < 50) {
                console.warn(`Se recibieron solo ${data.length} criptomonedas.`);
            }

            data.forEach((crypto, index) => {
                const row = document.createElement('tr');

                // Columna: Ranking
                const rankCell = document.createElement('td');
                rankCell.textContent = index + 1;
 // Columna: Nombre
                const nameCell = document.createElement('td');
                nameCell.textContent = crypto.name;

                // Columna: Símbolo
                const symbolCell = document.createElement('td');
                symbolCell.textContent = crypto.symbol.toUpperCase();

                // Columna: Precio (USD)
                const priceCell = document.createElement('td');
                priceCell.textContent = `$${crypto.current_price.toFixed(8)}`;

                // Columna: Market Cap en BTC
                const marketCapBtcCell = document.createElement('td');
                const marketCapBtc = (crypto.market_cap / bitcoinPrice).toFixed(8); // Calcula el market cap en BTC
                marketCapBtcCell.textContent = `${marketCapBtc} BTC`;

                // Columna: % del ATH
                const athPercentageCell = document.createElement('td');
                const athPercentage = ((crypto.current_price / crypto.ath) * 100).toFixed(2); // Calcula el % del ATH
                athPercentageCell.textContent = `${athPercentage}%`;
 // Aplicar colores según el porcentaje
                if (athPercentage > 80) {
                    athPercentageCell.classList.add('red');
                } else if (athPercentage >= 50 && athPercentage <= 80) {
                    athPercentageCell.classList.add('yellow');
                } else if (athPercentage >= 20 && athPercentage < 50) {
                    athPercentageCell.classList.add('green');
                }

                // Añadir celdas a la fila
                row.appendChild(rankCell);
                row.appendChild(nameCell);
                row.appendChild(symbolCell);
                row.appendChild(priceCell);
                row.appendChild(marketCapBtcCell);
                row.appendChild(athPercentageCell);

                // Añadir fila a la tabla
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

