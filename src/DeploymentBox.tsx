import FrontendDeploymentBox from "./FrontendDeploymentBox";
import BackendDeploymentBox from "./BackendDeploymentBox";
import Divider from "./components/Divider";

function DeploymentBox() {
  return (
    <section className="w-full p-4 flex gap-2 items-center">
      <FrontendDeploymentBox />
      <div className="h-full w-[5px] bg-blue-800">
        <Divider />
      </div>
      <BackendDeploymentBox />
    </section>
  );
}

export default DeploymentBox;
