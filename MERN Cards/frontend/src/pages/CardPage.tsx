import PageTitle from "../components/PageTitle";
import LoggedInName from "../components/LoggedInName";
import CardUI from "../components/CardUI";

export default function CardPage() {
  return (
    <div>
      <PageTitle />
      <LoggedInName />
      <CardUI />
    </div>
  );
}
