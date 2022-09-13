import Link from 'next/link';

const Pokemon = ({pokemon}) => {
  const id = pokemon.url.split('/').filter(x => x).pop();
  
  return (
    <li><Link href={`/pokemones/${id}`}>{pokemon.name}</Link></li>
  );
}

export default function Pokemones({ pokemones }) {
  return (
    <div>
      <p>Mi App de Pokemones</p>
      <ul>
        {pokemones.map(pokemon => <Pokemon pokemon={pokemon} key={pokemon.name}></Pokemon>)}
      </ul>
    </div>
  );
}

/*
Next detecta que si esta función existe, debe hacer renderizado estático.
La funcioón getStaticProps es sumamente poderosa ya que nos permite indicarle a NEXT que la página se va a generar de manera estática cuando nosotros ejecutemos "npm run build", de manera inmediata va a generar una página de HTML.
*/
export const getStaticProps = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await response.json();

  return {
    props: { pokemones: data.results }
  }
}
