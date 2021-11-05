import React, { useRef, } from 'react'
import { useSelector, RootStateOrAny } from 'react-redux';

export const MainBar = () => {
  const images = useSelector((state: RootStateOrAny) => state.SubmitPostReducer);
  console.log('images', images)


  return (
    <div className="flex-1">
      <div className="bg-indigo-900 text-purple-100 shadow-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 py-1 ">
          <div className="flex items-center justify-between">
            {/* <!-- Menu Trigger --> */}
            <button type="button" className="md:hidden w-10 h-10 rounded-lg -ml-2 flex justify-center items-center">
              <svg className="text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex w-auto h-full ">
              <div className="transition px-6 py-2 hover:bg-indigo-400 bg-indigo-600 text-bgray-900 hover:text-bgray-900 h-full cursor-pointer">
                Images
              </div>
              <div className="transition px-6 py-2 hover:bg-indigo-400 hover:text-bgray-900 h-full cursor-pointer">
                Videos
              </div>
            </div>


            <div className="flex items-center space-x-4">
              <button type="button" className="text-purple-500 shadow-sm rounded-lg bg-purple-100 w-20 py-2 px-1">
                Logout
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="py-6">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              {
                images.images.map((el: any, i: number) => {
                  const file = el[0];
                  let reader = new FileReader();
                  let fileRead:string[];
                  reader.onload = (env:any) => {
                    fileRead.push(`${env.target.result}`);
                  };
                  reader.readAsDataURL(file);
                  return (i===0&&<div key={i} className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4" style={{backgroundImage:`url('${fileRead[i]}')`}}>
                    <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                      <span className="text-5xl">1</span>
                    </div>

                  </div>)
                })
              }

            </div>
            <div className="w-auto px-4  overflow-y-scroll ">
              <div className="h-40 w-32 md:h-40 rounded-lg bg-gray-100 mb-4 ">
                <div className="h-40 w-32 md:h-40 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                  <span className="text-5xl">2</span>
                </div>
                <div className="h-40 w-32 md:h-40 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                  <span className="text-5xl">3</span>
                </div>
                <div className="h-40 w-32  md:h-40 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                  <span className="text-5xl">4</span>
                </div>

              </div>

            </div>
            <div className="md:flex-1 px-4 ">
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}
