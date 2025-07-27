import type { SingleCharacterData } from '../../../shared/api/types/types';

function SingleCharacterTable({ data }: SingleCharacterTableProps) {
  const { id, name, status, species, gender, image, origin, location } = data;

  if (!name && !species && !id) {
    return <p>Nothing was found</p>;
  }

  return (
    <table style={{ alignSelf: 'baseline' }}>
      <thead>
        <tr>
          <th colSpan={2}>Character #{id}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td>{name}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>{status}</td>
        </tr>
        <tr>
          <td>Species</td>
          <td>{species}</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>{gender}</td>
        </tr>
        <tr>
          <td>Origin</td>
          <td>{origin.name}</td>
        </tr>
        <tr>
          <td>Location</td>
          <td>{location.name}</td>
        </tr>
        <tr>
          <td>Image</td>
          <td>{image && <img src={image} alt={name} width={125} />}</td>
        </tr>
      </tbody>
    </table>
  );
}

type SingleCharacterTableProps = {
  data: SingleCharacterData;
};

export default SingleCharacterTable;
