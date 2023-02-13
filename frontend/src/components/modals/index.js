import AddChannel from './AddChannel';
import RenameChannel from './RenameChannel';
import RemoveChannel from './RemoveChannel';

const modals = {
  add: <AddChannel />,
  rename: <RenameChannel />,
  remove: <RemoveChannel />,
};

const getModal = (action) => modals[action];

export default getModal;
