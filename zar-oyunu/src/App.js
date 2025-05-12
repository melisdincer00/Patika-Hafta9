import React, { useState, useEffect } from 'react';
import Dice from './components/Dice';
import './App.css';

function App() {
  // Zar değerlerini tutan state'ler
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);

  // Oyuncu 1'in adı
  const [player1Name, setPlayer1Name] = useState("Player 1");

  // Ekranda gösterilecek sonuç mesajı
  const [result, setResult] = useState("🎲 Zar At!");

  // Zarlar atılıyor mu? (butonu devre dışı bırakmak için)
  const [isRolling, setIsRolling] = useState(false);

  // Kazanan oyuncuyu vurgulamak için (player1, player2, "")
  const [winner, setWinner] = useState("");

  // Sayfa açıldığında kullanıcıdan isim alınır
  useEffect(() => {
    const name = prompt("Lütfen adınızı girin:");
    if (name && name.trim() !== "") {
      setPlayer1Name(name.trim());
    }
  }, []);

  // Zar atma fonksiyonu
  const rollDice = () => {
    setIsRolling(true);              // Buton devre dışı
    setResult("🎲 Atılıyor...");     // Ekranda animasyon mesajı
    setWinner("");                   // Önceki kazanan sıfırlanır

    let counter = 0;

    // Zar görsellerini 3 saniye boyunca sürekli değiştir
    const interval = setInterval(() => {
      setDice1(Math.ceil(Math.random() * 6));
      setDice2(Math.ceil(Math.random() * 6));
      counter++;

      if (counter >= 30) {
        clearInterval(interval);

        // Gerçek zar değerlerini belirle
        const final1 = Math.ceil(Math.random() * 6);
        const final2 = Math.ceil(Math.random() * 6);

        setDice1(final1);
        setDice2(final2);

        // Sonucu kontrol et ve mesajı ayarla
        if (final1 > final2) {
          setResult(`${player1Name} Kazandı! 🏆`);
          setWinner("player1");
        } else if (final1 < final2) {
          setResult("Player 2 Kazandı! 😎");
          setWinner("player2");
        } else {
          setResult("Berabere! 🤝");
          setWinner("");
        }

        setIsRolling(false); // Zar atma bitti, buton tekrar aktif olur
      }
    }, 100); // 100ms'de bir yüz değiştirerek döndür
  };

  return (
    <div className="overlay">
      {/* Sonuç yazısı */}
      <h1 className="result">{result}</h1>

      {/* Zarları gösteren kutular */}
      <div className="dice-row">
        {/* Player 1 alanı */}
        <div className={winner === "player1" ? "winner" : ""}>
          <p className="player-name">{player1Name}</p>
          <Dice number={dice1} isShaking={isRolling} />
        </div>

        {/* Player 2 alanı */}
        <div className={winner === "player2" ? "winner" : ""}>
          <p className="player-name">Player 2</p>
          <Dice number={dice2} isShaking={isRolling} />
        </div>
      </div>

      {/* Zar At butonu */}
      <button className="roll-btn" onClick={rollDice} disabled={isRolling}>
        {isRolling ? "Atılıyor..." : "🎲 Zar At"}
      </button>

      {/* Footer */}
      <footer>
        <p>© Dicee Game 🎲</p>
      </footer>
    </div>
  );
}

export default App;
