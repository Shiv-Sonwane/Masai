import { Link } from "react-router-dom";

function CountryCard({ name, population, region, capital, flag }) {
  return (
    <Link
      to={`/country/${name.common.toLowerCase()}`}
      style={{
        border: "1px solid grey",
        borderRadius: "8px",
        padding: "10px",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <img src="{flag}" alt="{name.common}" width="100%" height="150px" />
      <h3>{name.common}</h3>
      <p>
        <b>Population:</b>
        {population.toLocalString()}
      </p>
      <p>
        <b>Region:</b>
        {region}
      </p>
      <p>
        <b>Capital:</b>
        {capital ? capital[0] : "N/A"}
      </p>
    </Link>
  );
}
