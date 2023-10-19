import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authSEL } from '../features/auth/authSlice';
import GoalForm from '../components/GoalForm';
import { reset, getGoals, goalSEL } from '../features/goals/goalSlice';
import Spinner from '../components/Spinner';
import GoalItem from '../components/GoalItem';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(authSEL);
  const { goals, isError, isLoading, message } = useSelector(goalSEL);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      return navigate('/login');
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user?.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => {
              return <GoalItem key={goal._id} goal={goal} />;
            })}
          </div>
        ) : (
          <h3>You have not set any goa.s</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
