import UserAccessDB from "../component/UserAccessDB";
import UserNotAccessDB from "../component/UserNotAccessDB";
import ApproverNewRequestDB from "../component/ApproverNewRequestDB";
import APILoader from "./APILoader";
export const tabConfig = (id) => ({
  Viewer: [
    {
      index: 0,
      label: 'My Datasets',
      component: () => (
        <APILoader url={`http://13.200.179.225:8002/user/dataset-access?user_id=${id}`}>
          <UserAccessDB />
        </APILoader>),
    },
    {
      index: 1,
      label: 'Request access for dataset',
      component: () => (
        <APILoader url={`http://13.200.179.225:8002/user/dataset-without-access?user_id=${id}`}>
          <UserNotAccessDB {...{ user_id:id }}/>
        </APILoader>),
    }
  ],
  Approver: [
    {
      index: 0,
      label: 'Dataset Access Requests',
      component: () => (
        <APILoader url={`http://13.200.179.225:8002/approver/pending-status`}>
          <ApproverNewRequestDB {...{ user_id:id }}/>
        </APILoader>)
    }
  ],
});