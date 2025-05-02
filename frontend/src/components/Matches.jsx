import React, { useEffect, useState } from 'react'
import MySideBar from './MySideBar'
import MiniProfile from './MiniProfile'
import api from './Api'
import toast from 'react-hot-toast'
import moment from 'moment'

const Matches = () => {
  const formatDate = (unformatted) => {
    return moment(unformatted).format("DD MMM YYYY")

  }
  const [loading, setLoading] = useState(false)
  const [sentRequests, setSentRequests] = useState([])
  const [incomingRequests, setIncomingRequests] = useState([])

  const loadSentRequests = async () => {
    try {
      setLoading(true)
      const response = await api.get("/swipe/sent");
      if (response.status === 200) {
        console.log(response.data)
        setSentRequests(response.data)

      }
    } catch (error) {
      toast.error(error);
    }
  }

  const loadReceivedRequests = async () => {
    try {
      setLoading(true)
      const response = await api.get("/swipe/received");
      if (response.status === 200) {
        setIncomingRequests(response.data)

      }
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    loadSentRequests();
    loadReceivedRequests();
  }, []);

  return (
    <>
      <div>
        <MySideBar />
      </div>

      <div className='w-full'>
        <div className='flex gap-36 mt-32 ml-18'>
          <div>
            <h1 className='text-3xl font-bold mb-10 ml-14'>Sent Requests</h1>
            {sentRequests.length > 0 ? <div className="flex flex-col gap-6">
              {sentRequests.map((sent) => {
                return <MiniProfile key={sent.fullName} profile={sent.profileId} name={sent.fullName} profession={sent.profession} joined={formatDate(sent.joining)} />
              })}
            </div> : (<p className="text-gray-500 ml-6">No  request sent</p>)}
          </div>

          <div>
            <h1 className='text-3xl font-bold mb-10 ml-6'>Incoming Requests</h1>
            {incomingRequests.length > 0 ? <div className="flex flex-col gap-6">
              {incomingRequests.map((receive) => {
                return <MiniProfile key={receive.fullName} profile={receive.profileId} name={receive.fullName} profession={receive.profession} joined={formatDate(receive.joining)} />
              })}
            </div> : (
              <p className="text-gray-500 ml-6">No incoming requests</p>
            )}
          </div>

        </div>
      </div>
    </>
  )
}

export default Matches