import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";
import { useState } from "react";

const Project = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });
  const [editRecord, setEditRecord] = useState(false);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>

          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>

          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{data.project.status}</p>
          <ClientInfo client={data.project.client} />

          {editRecord ? (
            <button
              className="btn btn-primary w-50 mt-5"
              onClick={() => setEditRecord(!editRecord)}
            >
              Hide Edit Record Form
            </button>
          ) : (
            <button
              className="btn btn-primary w-50 mt-5"
              onClick={() => setEditRecord(!editRecord)}
            >
              Show Edit Record Form
            </button>
          )}

          {editRecord && (
            <EditProjectForm
              project={data.project}
              setEditRecord={setEditRecord}
            />
          )}

          <DeleteProjectButton projectId={data.project.id} />
        </div>
      )}
    </>
  );
};

export default Project;
