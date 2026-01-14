export default function Meteow({ url }: { url: string }) {
  if (!url || url.trim() === "") {
    return <p className="text-sm italic">No Meteow widget available.</p>;
  }
  return (
    <div>
      <iframe
        src={`https://www.meteoblue.com/en/weather/widget/three/${url}?geoloc=fixed&nocurrent=0&noforecast=0&days=4&tempunit=CELSIUS&windunit=KILOMETER_PER_HOUR&layout=image&user_key=23fe34705c4e3c73&embed_key=b7c35316b54732f5&sig=43c638c6e2c6e6e762ef53d9d9d5c166918433482f1d8e0fd557f4137e9473e5`}
        frameBorder="0"
        scrolling="no"
        allowTransparency={true}
        sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
        style={{
          width: "460px",
          height: "572px",
          border: 0,
          overflow: "hidden",
        }}
      ></iframe>
      <div>
        {/* DO NOT REMOVE THIS LINK */}
        <a
          href="https://www.meteoblue.com/en/weather/week/index"
          target="_blank"
          rel="noopener noreferrer"
        >
          MeteoBlue
        </a>
      </div>
    </div>
  );
}
