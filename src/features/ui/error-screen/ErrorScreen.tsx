export function ErrorScreen({ error }: { error: Error }) {
  return (
    <div className="error-screen">
      <h6 className="fw-bold">{error?.name}</h6>
      <p className="p-3 fs-3">{error?.message}</p>
    </div>
  );
}
