import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Pokemon = ({ data }) => {
    const router = useRouter();
    console.log(router); // Este console.log se ejecuta primero en el servidor y luego en el cliente.

    if (router.isFallback) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <h1>{data.name} número #{data.id}</h1>
            <Image src={data.sprites.front_default} width={400} height={400} />
            <Link href="/">Volver al inicio</Link>
        </div>
    );
}

export default Pokemon;

/*
La forma en que React reconoce que necesita "getStaticPath" es por la ruta [id].
con getStaticPath, nosotros le indicamos a Next qué ruta específica haremos estática.
*/

export const getStaticProps = async ({ params }) => {
    // console.log(props);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
    const data = await response.json();

    return { props: { data } };
}

export const getStaticPaths = async () => {
    const paths = [
        { params: { id: '1' /*Debe ser como un string, no como un número*/ } /*Para indicar los parámetros que va a recibir por la URL*/ },
        { params: { id: '2' } }
    ];

    return {
        paths,
        fallback: true /*'blocking*/ /*Con fallback se indica a react que solo genere el HTML para las dos rutas, si queda en true, next lo renderizará, pero lo hará de manera "Lazy", quiere decir que en lado del servidor nos va a intentar renderizar el componente "Pokemon", pero no se va a encontrar nada dentro de "data".*/
    }
}

// export const getServerSideProps = async ({ params }) => {
//     // console.log(props);
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
//     const data = await response.json();

//     return { props: { data } };
// }
