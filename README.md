# React Native Swipe Suite! (COMING SOON)
### A npm module for all your swiping needs
Swipe Suite contains multiple swiping components with unique purposes and animations. Below is a list of all components, their uses, and examples of how to use them.


1. *HorizontalSwiper*
   1. Allows you to swipe through child components cyclically left and right
   1. Simple with no animation
   1. requires use of full screen width
   1. has onSwipeRight, onSwipeLeft, and isLoading props

1. *HorizontalSwiperWithFall*
   1. Same as Horizontal Swiper with added animation
   1. Swiped components fall away like cards being discarded

1. *HorizontalSwiperWithShrink*
   1. Same as Horizontal Swiper with added animation
   1. Swiped components shrink as they move away from the center, giving the illusion of fading into the background


1. *StackOfCards*
   1. allows you to swipe through child components as if they are a stack of cards. This is similar to Tinders swipe system
   1. Requires full screen width
   1. has onSwipeRight, onSwipeLeft, and isLoading props
   1. is currently cyclical, but you can stop this by changing child components.

1. *HandOfCards*
   1. Allows you to swipe through child components cyclically as if they are a hand of cards.
   1. Requires full screen width
   1. has onSwipeRight, onSwipeLeft, and isLoading props
   1. works best with 5 child components, but can do as few as two


1. *VerticalSwiper*
   1. Allows you to swipe through child components cyclically up and down
   1. Requires full screen height
   1. has onSwipeUp, onSwipeDown, and isLoading props


###HorizontalSwiper
![horizontal swiper](https://thumbs.gfycat.com/IllegalBraveBear-small.gif)

                 <HorizontalSwiper
                     isLoading={false}
                     onSwipeRight={()=>{console.log('right swipe')}}
                     onSwipeLeft={()=>{console.log('left swipe')}}
                 >

                     <View style={{
                         flex:1,
                         backgroundColor:'crimson',
                         alignItems:'center',
                         justifyContent:'center'
                     }}>
                         <Text style={{fontSize:50,color:'white'}}>
                             First
                         </Text>
                     </View>

                     <View style={{
                         flex:1,
                         backgroundColor:'teal',
                         alignItems:'center',
                         justifyContent:'center'
                     }}>
                         <Text style={{fontSize:50,color:'white'}}>
                             Second
                         </Text>
                     </View>

                     <View style={{
                         flex:1,
                         backgroundColor:'tomato',
                         alignItems:'center',
                         justifyContent:'center'
                     }}>
                         <Text style={{fontSize:50,color:'white'}}>
                             Third
                         </Text>
                     </View>


                 </HorizontalSwiper>


###HorizontalSwiperWithFall
![horizontal swiper with fall](https://thumbs.gfycat.com/BlackGiddyBighorn-small.gif)

                   <HorizontalSwiperWithFall
                       isLoading={false}
                       onSwipeRight={()=>{console.log('right swipe')}}
                       onSwipeLeft={()=>{console.log('left swipe')}}
                   >

                       <View style={{
                           flex:1,
                           backgroundColor:'crimson',
                           alignItems:'center',
                           justifyContent:'center'
                       }}>
                           <Text style={{fontSize:50,color:'white'}}>
                               First
                           </Text>
                       </View>

                       <View style={{
                           flex:1,
                           backgroundColor:'teal',
                           alignItems:'center',
                           justifyContent:'center'
                       }}>
                           <Text style={{fontSize:50,color:'white'}}>
                               Second
                           </Text>
                       </View>

                       <View style={{
                           flex:1,
                           backgroundColor:'tomato',
                           alignItems:'center',
                           justifyContent:'center'
                       }}>
                           <Text style={{fontSize:50,color:'white'}}>
                               Third
                           </Text>
                       </View>


                   </HorizontalSwiperWithFall>

###HorizontalSwiperWithShrink
![horizontal swiper with Shrink](https://thumbs.gfycat.com/TenseWelllitIchthyostega-small.gif)

                  <HorizontalSwiperWithShrink
                      isLoading={false}
                      onSwipeRight={()=>{console.log('right swipe')}}
                      onSwipeLeft={()=>{console.log('left swipe')}}
                  >

                      <View style={{
                          flex:1,
                          backgroundColor:'crimson',
                          alignItems:'center',
                          justifyContent:'center'
                      }}>
                          <Text style={{fontSize:50,color:'white'}}>
                              First
                          </Text>
                      </View>

                      <View style={{
                          flex:1,
                          backgroundColor:'teal',
                          alignItems:'center',
                          justifyContent:'center'
                      }}>
                          <Text style={{fontSize:50,color:'white'}}>
                              Second
                          </Text>
                      </View>

                      <View style={{
                          flex:1,
                          backgroundColor:'tomato',
                          alignItems:'center',
                          justifyContent:'center'
                      }}>
                          <Text style={{fontSize:50,color:'white'}}>
                              Third
                          </Text>
                      </View>


                  </HorizontalSwiperWithShrink>

###StackOfCards
![stack of cards](https://thumbs.gfycat.com/SpryTenseDuiker-small.gif)

                     <StackOfCards
                         isLoading={false}
                         onSwipeRight={()=>{console.log('right swipe')}}
                         onSwipeLeft={()=>{console.log('left swipe')}}
                     >

                         <View style={{
                             flex:1,
                             backgroundColor:'crimson',
                             alignItems:'center',
                             justifyContent:'center'
                         }}>
                             <Text style={{fontSize:50,color:'white'}}>
                                 First
                             </Text>
                         </View>

                         <View style={{
                             flex:1,
                             backgroundColor:'teal',
                             alignItems:'center',
                             justifyContent:'center'
                         }}>
                             <Text style={{fontSize:50,color:'white'}}>
                                 Second
                             </Text>
                         </View>

                         <View style={{
                             flex:1,
                             backgroundColor:'tomato',
                             alignItems:'center',
                             justifyContent:'center'
                         }}>
                             <Text style={{fontSize:50,color:'white'}}>
                                 Third
                             </Text>
                         </View>


                     </StackOfCards>

###HandOfCards
![hand of cards](https://thumbs.gfycat.com/VainTenderGeese-small.gif)

              <View style={{flex:1,backgroundColor:'black'}}>

                  <HandOfCards
                      isLoading={false}
                      onSwipeRight={()=>{console.log('right swipe')}}
                      onSwipeLeft={()=>{console.log('left swipe')}}
                  >

                      <View style={{
                          flex:1,
                          backgroundColor:'crimson',
                          alignItems:'center',
                          justifyContent:'center',
                          margin:10,
                          borderRadius:20
                      }}>
                          <Text style={{fontSize:50,color:'white'}}>
                              First
                          </Text>
                      </View>

                      <View style={{
                          flex:1,
                          backgroundColor:'teal',
                          alignItems:'center',
                          justifyContent:'center',
                          margin:10,
                          borderRadius:20
                      }}>
                          <Text style={{fontSize:50,color:'white'}}>
                              Second
                          </Text>
                      </View>

                      <View style={{
                          flex:1,
                          backgroundColor:'tomato',
                          alignItems:'center',
                          justifyContent:'center',
                          margin:10,
                          borderRadius:20
                      }}>
                          <Text style={{fontSize:50,color:'white'}}>
                              Third
                          </Text>
                      </View>

                      <View style={{
                          flex:1,
                          backgroundColor:'skyblue',
                          alignItems:'center',
                          justifyContent:'center',
                          margin:10,
                          borderRadius:20
                      }}>
                          <Text style={{fontSize:50,color:'white'}}>
                              Fourth
                          </Text>
                      </View>

                      <View style={{
                          flex:1,
                          backgroundColor:'violet',
                          alignItems:'center',
                          justifyContent:'center',
                          margin:10,
                          borderRadius:20
                      }}>
                          <Text style={{fontSize:50,color:'white'}}>
                              Fifth
                          </Text>
                      </View>


                  </HandOfCards>

              </View>

###VerticalSwiper
![hand of cards](https://thumbs.gfycat.com/QuerulousDirectKarakul-small.gif)

                 <VerticalSwiper
                     isLoading={false}
                     onSwipeRight={()=>{console.log('right swipe')}}
                     onSwipeLeft={()=>{console.log('left swipe')}}
                 >

                     <View style={{
                         flex:1,
                         backgroundColor:'crimson',
                         alignItems:'center',
                         justifyContent:'center',
                     }}>
                         <Text style={{fontSize:50,color:'white'}}>
                             First
                         </Text>
                     </View>

                     <View style={{
                         flex:1,
                         backgroundColor:'teal',
                         alignItems:'center',
                         justifyContent:'center',
                     }}>
                         <Text style={{fontSize:50,color:'white'}}>
                             Second
                         </Text>
                     </View>

                     <View style={{
                         flex:1,
                         backgroundColor:'tomato',
                         alignItems:'center',
                         justifyContent:'center',
                     }}>
                         <Text style={{fontSize:50,color:'white'}}>
                             Third
                         </Text>
                     </View>

                 </VerticalSwiper>
