import { canSSRAuth } from "@/utils/canSSRAuth";

export default function Dashboard() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export const getServerSideProps = canSSRAuth(async () => {
  return { props: {} };
});
