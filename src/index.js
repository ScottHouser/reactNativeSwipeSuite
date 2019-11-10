import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity,Dimensions,Animated,PanResponder,ImageBackground,Image } from 'react-native';

export class HorizontalSwiper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenWidthValue:Dimensions.get('window').width,
            screenHeightValue:Dimensions.get('window').height,
            pan: new Animated.ValueXY(),
            counter:0,
            turnt:false,
            turntDirection:'none',
        };

        this.numberOfChildren=React.Children.toArray(this.props.children).length
    }

    componentWillMount =()=> {
        this._animatedValueX = 0;
        this._animatedValueY = 0;
        this.state.pan.x.addListener((value) => this._animatedValueX = value.value);
        this.state.pan.y.addListener((value) => this._animatedValueY = value.value);

        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (e, gestureState) => {

                this.state.pan.setOffset({x: 0, y: 0});
                this.state.pan.setValue({x: 0, y: 0});
                this.trunDown()
                this.directionNone()

            },
            onPanResponderMove: Animated.event([
                null, {
                    dx: this.state.pan.x,
                },
            ]),
            onPanResponderRelease: (e,gestureState) => {

                if(gestureState.dx < -this.state.screenWidthValue/2){
                    Animated.spring(this.state.pan, {
                        toValue: ({x: -this.state.screenWidthValue, y: 0}),
                        bounciness:1
                    }).start();
                    this.addCounter();
                    this.getTurnt();
                    this.onSwipeLeft();
                }else if(gestureState.dx > this.state.screenWidthValue/2){
                    Animated.spring(this.state.pan, {
                        toValue: ({x: this.state.screenWidthValue, y: 0}),//3.35
                        bounciness:1
                    }).start();
                    this.minusCounter()
                    this.getTurnt()
                    this.onSwipeRight();
                }
                else{
                    Animated.spring(this.state.pan, {
                        toValue: 0,
                        bounciness:1
                    }).start();
                }
            }
        });
    };

    componentWillUnmount =()=> {
        this.state.pan.x.removeAllListeners();
        this.state.pan.y.removeAllListeners();
    }

    addCounter=()=>{
        if(this.state.counter>(this.numberOfChildren-2)){
            this.setState({counter:0,turntDirection:'left'})
        }else{
            let counter=this.state.counter
            counter=counter+1
            this.setState({counter:counter,turntDirection:'left'})
        }
    };

    minusCounter=()=>{
        if(this.state.counter<1){
            this.setState({counter:this.numberOfChildren-1,turntDirection:'right'})
        }else{
            let counter=this.state.counter
            counter=counter-1
            this.setState({counter:counter,turntDirection:'right'})
        }
    };

    getTurnt = () =>{
        this.setState({turnt:true,})
    };

    trunDown = () =>{
        this.setState({turnt:false,})
    };

    directionNone = () =>{
        this.setState({turntDirection:'none'})
    };

    middleViewController = () =>{
        if(this.state.turntDirection==='none'){
            return this.state.counter
        }else if(this.state.turntDirection==='left'){
            if(this.state.counter===0){
                return this.numberOfChildren-1
            }else{
                return this.state.counter-1
            }
        }else if(this.state.turntDirection==='right'){

            if(this.state.counter>this.numberOfChildren-2){
                return 0
            }else{
                return this.state.counter+1
            }
        }
    };

    rightDisplayController =()=>{

        if(this.state.turnt){
            return this.state.counter+0
        }else{
            if(this.state.counter>this.numberOfChildren-2){
                return 0
            }else{
                return this.state.counter+1
            }
        }
    };

    leftDisplayController =()=>{

        if(this.state.turnt){
            return this.state.counter+0
        }else{
            if(this.state.counter===0){
                return this.numberOfChildren-1
            }else{
                return this.state.counter-1
            }
        }
    };

    onSwipeRight = () => {

        if(!this.props.onSwipeRight){
            return
        }

        this.props.onSwipeRight()
    };

    onSwipeLeft = () => {

        if(!this.props.onSwipeLeft){
            return
        }

        this.props.onSwipeLeft()
    };

    getStyle=()=> {


        return [
            styles.square,
            {
                transform: [
                    {translateX: this.state.pan.x},
                    {translateY: this.state.pan.y},
                ]
            },
        ];
    };

    render() {

        const holderStyle={
            flex:1,
            width:'300%',
            backgroundColor:'transparent',//'#017acd',
            flexDirection: 'row',
            transform:
                [{translateX:-1*this.state.screenWidthValue}]
        };

        const leftSquare={
            flex:1,
            backgroundColor: 'transparent',
            transform:
                [{translateX: this.state.pan.x}]
        };


        const rightSquare={
            flex:1,
            backgroundColor: 'transparent',
            transform:
                [{translateX: this.state.pan.x}]
        };

        return (
            <View style={{
                flex: 1,
                backgroundColor:'transparent'//'#017acd'
            }}
            >

                <View style={holderStyle}>

                    <Animated.View
                        style={leftSquare}
                        {...this._panResponder.panHandlers}
                    >
                        {React.Children.toArray(this.props.children)[this.leftDisplayController()]}

                    </Animated.View>

                    <Animated.View
                        style={this.getStyle()}
                        {...this._panResponder.panHandlers}
                    >
                        {React.Children.toArray(this.props.children)[this.middleViewController()]}

                    </Animated.View>

                    <Animated.View
                        style={rightSquare}
                        {...this._panResponder.panHandlers}
                    >

                        {React.Children.toArray(this.props.children)[this.rightDisplayController()]}

                    </Animated.View>


                </View>

            </View>
        );
    }
}

export class HorizontalSwiperWithShrink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenWidthValue:Dimensions.get('window').width,
            screenHeightValue:Dimensions.get('window').height,
            pan: new Animated.ValueXY(),
            counter:0,
            turnt:false,
            turntDirection:'none',
        };

        this.numberOfChildren=React.Children.toArray(this.props.children).length
    }

    componentWillMount =()=> {
        this._animatedValueX = 0;
        this._animatedValueY = 0;
        this.state.pan.x.addListener((value) => this._animatedValueX = value.value);
        this.state.pan.y.addListener((value) => this._animatedValueY = value.value);

        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (e, gestureState) => {

                this.state.pan.setOffset({x: 0, y: 0});
                this.state.pan.setValue({x: 0, y: 0});
                this.trunDown()
                this.directionNone()

            },
            onPanResponderMove: Animated.event([
                null, {
                    dx: this.state.pan.x,
                },
            ]),
            onPanResponderRelease: (e,gestureState) => {

                console.log(gestureState.dx)

                if(gestureState.dx < -this.state.screenWidthValue/2){
                //if(gestureState.moveX < 30){
                    Animated.spring(this.state.pan, {
                        toValue: ({x: -this.state.screenWidthValue, y: 0})
                    }).start();
                    this.addCounter();
                    this.getTurnt();
                    this.onSwipeLeft();
                }else if(gestureState.dx > this.state.screenWidthValue/2){
                    Animated.spring(this.state.pan, {
                        toValue: ({x: this.state.screenWidthValue, y: 0})//3.35
                    }).start();
                    this.minusCounter()
                    this.getTurnt()
                    this.onSwipeRight();
                }
                else{
                    Animated.spring(this.state.pan, {
                        toValue: 0
                    }).start();
                }
            }
        });
    };

    componentWillUnmount =()=> {
        this.state.pan.x.removeAllListeners();
        this.state.pan.y.removeAllListeners();
    }

    addCounter=()=>{
        if(this.state.counter>(this.numberOfChildren-2)){
            this.setState({counter:0,turntDirection:'left'})
        }else{
            let counter=this.state.counter
            counter=counter+1
            this.setState({counter:counter,turntDirection:'left'})
        }
    };

    minusCounter=()=>{
        if(this.state.counter<1){
            this.setState({counter:this.numberOfChildren-1,turntDirection:'right'})
        }else{
            let counter=this.state.counter
            counter=counter-1
            this.setState({counter:counter,turntDirection:'right'})
        }
    };

    getTurnt = () =>{
        this.setState({turnt:true,})
    };

    trunDown = () =>{
        this.setState({turnt:false,})
    };

    directionNone = () =>{
        this.setState({turntDirection:'none'})
    };

    middleViewController = () =>{
        if(this.state.turntDirection==='none'){
            return this.state.counter
        }else if(this.state.turntDirection==='left'){
            if(this.state.counter===0){
                return this.numberOfChildren-1
            }else{
                return this.state.counter-1
            }
        }else if(this.state.turntDirection==='right'){

            if(this.state.counter>this.numberOfChildren-2){
                return 0
            }else{
                return this.state.counter+1
            }
        }
    };

    rightDisplayController =()=>{

        if(this.state.turnt){
            return this.state.counter+0
        }else{
            if(this.state.counter>this.numberOfChildren-2){
                return 0
            }else{
                return this.state.counter+1
            }
        }
    };

    leftDisplayController =()=>{

        if(this.state.turnt){
            return this.state.counter+0
        }else{
            if(this.state.counter===0){
                return this.numberOfChildren-1
            }else{
                return this.state.counter-1
            }
        }
    };

    onSwipeRight = () => {

        if(!this.props.onSwipeRight){
            return
        }

        this.props.onSwipeRight()
    };

    onSwipeLeft = () => {

        if(!this.props.onSwipeLeft){
            return
        }

        this.props.onSwipeLeft()
    };

    getStyle=()=> {


        return [
            styles.square,
            {
                transform: [
                    {translateX: this.state.pan.x},
                    {translateY: this.state.pan.y},

                ]
            },
        ];
    };

    render() {

        const holderStyle={
            flex:1,
            width:'300%',
            backgroundColor:'transparent',
            flexDirection: 'row',
            transform:
                [{translateX:-1*this.state.screenWidthValue}]
        };

        const leftSquare={
            flex:1,
            backgroundColor: 'transparent',
            transform:
                [{translateX: this.state.pan.x}]
        };


        const rightSquare={
            flex:1,
            backgroundColor: 'transparent',
            transform:
                [{translateX: this.state.pan.x}]
        };

        const interpolateShrink = this.state.pan.x.interpolate({
            inputRange: [-100,0, 100],
            outputRange: [.05,0,.05],
        });

        const interpolateShrink2 = this.state.pan.x.interpolate({
            inputRange: [-this.state.screenWidthValue*2,-this.state.screenWidthValue,0, 100,100],
            outputRange: [.2,0,.2,.5,1],
        });

        const interpolateShrink3 = this.state.pan.x.interpolate({
            inputRange: [-this.state.screenWidthValue*2,-this.state.screenWidthValue,0, this.state.screenWidthValue,this.state.screenWidthValue*2],
            outputRange: [1,1,.2,0,.2],
        });

        const middleSquareShrink = {
            flex:interpolateShrink,
            backgroundColor:'transparent'
        };

        const rightSquareShrink = {
            flex:interpolateShrink2,
            backgroundColor:'transparent'
        };

        const leftSquareShrink = {
            flex:interpolateShrink3,
            backgroundColor:'transparent'
        };

        return (
            <View style={{
                flex: 1,
                backgroundColor:'transparent'//'#017acd'
            }}
            >

                <View style={holderStyle}>

                    <Animated.View
                        style={leftSquare}
                        {...this._panResponder.panHandlers}
                    >
                        <View style={{flex:1,flexDirection: 'row'}}>
                            <Animated.View style={leftSquareShrink}/>
                            <View style={{flex:1}}>
                                <Animated.View style={leftSquareShrink}/>
                                <View style={{flex:1}}>
                                    {React.Children.toArray(this.props.children)[this.leftDisplayController()]}
                                </View>
                                <Animated.View style={leftSquareShrink}/>
                            </View>
                            <Animated.View style={leftSquareShrink}/>
                        </View>

                    </Animated.View>

                    <Animated.View
                        style={this.getStyle()}
                        {...this._panResponder.panHandlers}
                    >
                        <View style={{flex:1,flexDirection: 'row'}}>
                            <Animated.View style={middleSquareShrink}/>
                            <View style={{flex:1}}>
                                <Animated.View style={middleSquareShrink}/>
                                <View style={{flex:1}}>
                                {React.Children.toArray(this.props.children)[this.middleViewController()]}
                                </View>
                                <Animated.View style={middleSquareShrink}/>
                            </View>
                            <Animated.View style={middleSquareShrink}/>
                        </View>

                    </Animated.View>

                    <Animated.View
                        style={rightSquare}
                        {...this._panResponder.panHandlers}
                    >

                        <View style={{flex:1,flexDirection: 'row'}}>
                            <Animated.View style={rightSquareShrink}/>
                            <View style={{flex:1}}>
                                <Animated.View style={rightSquareShrink}/>
                                <View style={{flex:1}}>
                                    {React.Children.toArray(this.props.children)[this.rightDisplayController()]}
                                </View>
                                <Animated.View style={rightSquareShrink}/>
                            </View>
                            <Animated.View style={rightSquareShrink}/>
                        </View>

                    </Animated.View>


                </View>

            </View>
        );
    }
}

export class HorizontalSwiperWithFall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenWidthValue:Dimensions.get('window').width,
            screenHeightValue:Dimensions.get('window').height,
            pan: new Animated.ValueXY(),
            counter:1,
            turnt:true,
            turntDirection:'none',
        };

        this.numberOfChildren=React.Children.toArray(this.props.children).length
    }

    componentWillMount =()=> {
        this._animatedValueX = 0;
        this._animatedValueY = 0;
        this.state.pan.x.addListener((value) => this._animatedValueX = value.value);
        this.state.pan.y.addListener((value) => this._animatedValueY = value.value);

        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (e, gestureState) => {

                this.state.pan.setOffset({x: 0, y: 0});
                //this.state.pan.setOffset({x: this._animatedValueX, y: this._animatedValueY});
                this.state.pan.setValue({x: 0, y: 0});
                this.trunDown()
                this.directionNone()

            },
            onPanResponderMove: Animated.event([
                null, {
                    dx: this.state.pan.x,
                    dy: this.state.pan.y
                },
            ]),
            onPanResponderRelease: (e,gestureState) => {

                if(gestureState.dx < -this.state.screenWidthValue/2){
                    Animated.spring(this.state.pan, {
                        //toValue: ({x: -this.state.screenWidthValue, y: 200})
                        toValue: ({x: -this.state.screenWidthValue, y: this.state.screenHeightValue/1.7})
                    }).start();
                    this.addCounter();
                    this.getTurnt();
                    this.onSwipeLeft();
                }else if(gestureState.dx > this.state.screenWidthValue/2){
                    Animated.spring(this.state.pan, {
                        //toValue: ({x: this.state.screenWidthValue, y: 200})
                        toValue: ({x: this.state.screenWidthValue, y: this.state.screenHeightValue/1.7})//3.35
                    }).start();
                    this.minusCounter()
                    this.getTurnt()
                    this.onSwipeRight();
                }
                else{
                    Animated.spring(this.state.pan, {
                        toValue: 0
                    }).start();
                }
            }
        });
    };

    componentWillUnmount =()=> {
        this.state.pan.x.removeAllListeners();
        this.state.pan.y.removeAllListeners();
    }

    addCounter=()=>{
        if(this.state.counter>(this.numberOfChildren-2)){
            this.setState({counter:0,turntDirection:'left'})
        }else{
            let counter=this.state.counter
            counter=counter+1
            this.setState({counter:counter,turntDirection:'left'})
        }
    };

    minusCounter=()=>{
        if(this.state.counter<1){
            this.setState({counter:this.numberOfChildren-1,turntDirection:'right'})
        }else{
            let counter=this.state.counter
            counter=counter-1
            this.setState({counter:counter,turntDirection:'right'})
        }
    };

    getTurnt = () =>{
        this.setState({turnt:true,})
    };

    trunDown = () =>{
        this.setState({turnt:false,})
    };

    directionNone = () =>{
        this.setState({turntDirection:'none'})
    };

    middleViewController = () =>{
        if(this.state.turntDirection==='none'){
            return this.state.counter
        }else if(this.state.turntDirection==='left'){
            if(this.state.counter===0){
                return this.numberOfChildren-1
            }else{
                return this.state.counter-1
            }
        }else if(this.state.turntDirection==='right'){

            if(this.state.counter>this.numberOfChildren-2){
                return 0
            }else{
                return this.state.counter+1
            }
        }
    };

    rightDisplayController =()=>{

        if(this.state.turnt){
            return this.state.counter+0
        }else{
            if(this.state.counter>this.numberOfChildren-2){
                return 0
            }else{
                return this.state.counter+1
            }
        }
    };

    leftDisplayController =()=>{

        if(this.state.turnt){
            return this.state.counter+0
        }else{
            if(this.state.counter===0){
                return this.numberOfChildren-1
            }else{
                return this.state.counter-1
            }
        }
    };

    onSwipeRight = () => {

        if(!this.props.onSwipeRight){
            return
        }

        this.props.onSwipeRight()
    };

    onSwipeLeft = () => {

        if(!this.props.onSwipeLeft){
            return
        }

        this.props.onSwipeLeft()
    };

    getStyle=()=> {


        return [
            styles.square,
            {
                transform: [
                    {translateX: this.state.pan.x},
                    {translateY: this.state.pan.y},
                    {
                        rotate: this.state.pan.x.interpolate({

                            inputRange: [-this.state.screenWidthValue, 0, this.state.screenWidthValue],

                            outputRange: ["-31deg", "0deg", "34.5deg"]
                        })
                    }
                ]
            },
        ];
    };

    render() {

        const holderStyle={
            flex:1,
            width:'300%',
            backgroundColor:'transparent',//'#017acd',
            flexDirection: 'row',
            transform:
                [{translateX:-1*this.state.screenWidthValue}]
        };

        const leftSquare={
            flex:1,
            backgroundColor: 'transparent',
            transform:
                [{translateX: this.state.pan.x}]
        };


        const rightSquare={
            flex:1,
            backgroundColor: 'transparent',
            transform:
                [{translateX: this.state.pan.x}]
        };

        return (
            <View style={{
                flex: 1,
                backgroundColor:'transparent'//'#017acd'
            }}
            >

                <View style={holderStyle}>

                    <Animated.View
                        style={leftSquare}
                        {...this._panResponder.panHandlers}
                    >
                        {React.Children.toArray(this.props.children)[this.leftDisplayController()]}

                    </Animated.View>

                    <Animated.View
                        style={this.getStyle()}
                        {...this._panResponder.panHandlers}
                    >
                        {React.Children.toArray(this.props.children)[this.middleViewController()]}

                    </Animated.View>

                    <Animated.View
                        style={rightSquare}
                        {...this._panResponder.panHandlers}
                    >

                        {React.Children.toArray(this.props.children)[this.rightDisplayController()]}

                    </Animated.View>


                </View>

            </View>
        );
    }
}

export class StackOfCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenWidthValue:Dimensions.get('window').width,
            screenHeightValue:Dimensions.get('window').height,
            pan: new Animated.ValueXY(),
            counter:0,
            turnt:true,
            turntDirection:'none',
        };

        this.numberOfChildren=React.Children.toArray(this.props.children).length
    }

    componentWillMount =()=> {
        this._animatedValueX = 0;
        this._animatedValueY = 0;
        this.state.pan.x.addListener((value) => this._animatedValueX = value.value);
        this.state.pan.y.addListener((value) => this._animatedValueY = value.value);

        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (e, gestureState) => {

                this.state.pan.setOffset({x: 0, y: 0});
                //this.state.pan.setOffset({x: this._animatedValueX, y: this._animatedValueY});
                this.state.pan.setValue({x: 0, y: 0});
                this.trunDown()
                this.directionNone()

            },
            onPanResponderMove: Animated.event([
                null, {
                    dx: this.state.pan.x,
                    dy: this.state.pan.y
                },
            ]),
            onPanResponderRelease: (e,gestureState) => {

                if(gestureState.dx < -this.state.screenWidthValue/2){
                    Animated.spring(this.state.pan, {
                        //toValue: ({x: -this.state.screenWidthValue, y: 200})
                        toValue: ({x: -this.state.screenWidthValue, y: this.state.screenHeightValue/1.6})
                    }).start();
                    this.addCounter();
                    this.getTurnt();
                    this.onSwipeLeft();
                }else if(gestureState.dx > this.state.screenWidthValue/2){
                    Animated.spring(this.state.pan, {
                        //toValue: ({x: this.state.screenWidthValue, y: 200})
                        toValue: ({x: this.state.screenWidthValue, y: this.state.screenHeightValue/1.6})//3.35
                    }).start();
                    this.addCounter()
                    this.getTurnt()
                    this.onSwipeRight();
                }
                else{
                    Animated.spring(this.state.pan, {
                        toValue: 0
                    }).start();
                }
            }
        });
    };

    componentWillUnmount =()=> {
        this.state.pan.x.removeAllListeners();
        this.state.pan.y.removeAllListeners();
    }

    addCounter=()=>{
        if(this.state.counter>(this.numberOfChildren-2)){
            this.setState({counter:0,turntDirection:'left'})
        }else{
            let counter=this.state.counter
            counter=counter+1
            this.setState({counter:counter,turntDirection:'left'})
        }
    };

    minusCounter=()=>{
        if(this.state.counter<1){
            this.setState({counter:this.numberOfChildren-1,turntDirection:'right'})
        }else{
            let counter=this.state.counter
            counter=counter-1
            this.setState({counter:counter,turntDirection:'right'})
        }
    };

    getTurnt = () =>{
        this.setState({turnt:true,})
    };

    trunDown = () =>{
        this.setState({turnt:false,})
    };

    directionNone = () =>{
        this.setState({turntDirection:'none'})
    };

    middleViewController = () =>{
        if(this.state.turntDirection==='none'){
            return this.state.counter
        }else if(this.state.turntDirection==='left'){
            if(this.state.counter===0){
                return this.numberOfChildren-1
            }else{
                return this.state.counter-1
            }
        }else if(this.state.turntDirection==='right'){

            if(this.state.counter>this.numberOfChildren-2){
                return 0
            }else{
                return this.state.counter+1
            }
        }
    };

    rightDisplayController =()=>{

        if(this.state.turnt){
            return this.state.counter+0
        }else{
            if(this.state.counter>this.numberOfChildren-2){
                return 0
            }else{
                return this.state.counter+1
            }
        }
    };

    leftDisplayController =()=>{

        if(this.state.turnt){
            return this.state.counter+0
        }else{
            if(this.state.counter===0){
                return this.numberOfChildren-1
            }else{
                return this.state.counter-1
            }
        }
    };

    onSwipeRight = () => {

        if(!this.props.onSwipeRight){
            return
        }

        this.props.onSwipeRight()
    };

    onSwipeLeft = () => {

        if(!this.props.onSwipeLeft){
            return
        }

        this.props.onSwipeLeft()
    };

    getStyle=()=> {


        return [
            styles.square,
            {
                transform: [
                    {translateX: this.state.pan.x},
                    {translateY: this.state.pan.y},
                    {
                        rotate: this.state.pan.x.interpolate({

                            inputRange: [-this.state.screenWidthValue, 0, this.state.screenWidthValue],

                            outputRange: ["-31deg", "0deg", "34.5deg"]
                        })
                    }
                ]
            },
        ];
    };

    render() {

        const holderStyle={
            flex:1,
            width:'200%',
            backgroundColor:'transparent',//'#017acd',
            flexDirection: 'row',
            transform:
                [{translateX:-1*this.state.screenWidthValue}]
        };

        const leftSquare={
            flex:1,
            backgroundColor: 'transparent',
            transform:
                [{translateX:1*this.state.screenWidthValue}]
        };


        const rightSquare={
            flex:1,
            backgroundColor: 'transparent',
            elevation:0,
            transform:
                [{translateX:-1*this.state.screenWidthValue}]
        };

        return (
            <View style={{
                flex: 1,
                backgroundColor:'transparent'//'#017acd'
            }}
            >
                {!this.props.isLoading &&

                    <View style={holderStyle}>

                        <Animated.View
                            style={leftSquare}
                            {...this._panResponder.panHandlers}
                        >

                            {
                                React.Children.toArray(this.props.children)[this.rightDisplayController()]
                            }

                        </Animated.View>

                        <Animated.View
                            style={this.getStyle()}
                            {...this._panResponder.panHandlers}
                        >
                            {
                                React.Children.toArray(this.props.children)[this.middleViewController()]
                            }

                        </Animated.View>

                    </View>
                }

            </View>
        );
    }
}

export class HandOfCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenWidthValue:Dimensions.get('window').width,
            screenHeightValue:Dimensions.get('window').height,
            pan: new Animated.ValueXY(),
            counter:0,
            turnt:false,
            turntDirection:'none',
        };
        this.numberOfChildren=React.Children.toArray(this.props.children).length
    }

    componentWillMount =()=> {
        //this.rightDisplayController();
        this.numberOfChildren=React.Children.toArray(this.props.children).length
        this._animatedValueX = 0;
        this._animatedValueY = 0;
        this.state.pan.x.addListener((value) => this._animatedValueX = value.value);
        this.state.pan.y.addListener((value) => this._animatedValueY = value.value);

        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (e, gestureState) => {

                this.state.pan.setOffset({x: 0, y: 0});
                //this.state.pan.setOffset({x: this._animatedValueX, y: this._animatedValueY});
                this.state.pan.setValue({x: 0, y: 0});
                this.trunDown()
                this.directionNone()

            },
            onPanResponderMove: Animated.event([
                null, {
                    dx: this.state.pan.x,
                    dy: this.state.pan.y
                },
            ]),
            onPanResponderRelease: (e,gestureState) => {

                if(gestureState.dx < -this.state.screenWidthValue/2){
                    Animated.spring(this.state.pan, {
                        //toValue: ({x: -this.state.screenWidthValue, y: 200})
                        toValue: ({x: -this.state.screenWidthValue, y: this.state.screenHeightValue/4})
                    }).start();
                    this.addCounter()
                    this.getTurnt()
                }else if(gestureState.dx > this.state.screenWidthValue/2){
                    Animated.spring(this.state.pan, {
                        //toValue: ({x: this.state.screenWidthValue, y: 200})
                        toValue: ({x: this.state.screenWidthValue, y: this.state.screenHeightValue/3.8})//3.35
                    }).start();
                    this.minusCounter()
                    this.getTurnt()
                }
                else{
                    Animated.spring(this.state.pan, {
                        toValue: 0
                    }).start();
                }
            }
        });
    }

    componentWillUnmount =()=> {
        this.state.pan.x.removeAllListeners();
        this.state.pan.y.removeAllListeners();
    }

    addCounter=()=>{
        if(this.state.counter>(this.numberOfChildren-2)){
            this.setState({counter:0,turntDirection:'left'})
        }else{
            let counter=this.state.counter
            counter=counter+1
            this.setState({counter:counter,turntDirection:'left'})
        }
    }

    minusCounter=()=>{
        if(this.state.counter<1){
            this.setState({counter:this.numberOfChildren-1,turntDirection:'right'})
        }else{
            let counter=this.state.counter
            counter=counter-1
            this.setState({counter:counter,turntDirection:'right'})
        }
    }

    getTurnt = () =>{
        this.setState({turnt:true,})
    }

    trunDown = () =>{
        this.setState({turnt:false,})
    }

    directionNone = () =>{
        this.setState({turntDirection:'none'})
    }

    middleViewController = () =>{
        if(this.state.turntDirection==='none'){
            return this.state.counter
        }else if(this.state.turntDirection==='left'){
            if(this.state.counter===0){
                return this.numberOfChildren-1
            }else{
                return this.state.counter-1
            }
        }else if(this.state.turntDirection==='right'){

            if(this.state.counter>this.numberOfChildren-2){
                return 0
            }else{
                return this.state.counter+1
            }
        }
    };

    rightDisplayController =()=>{

        if(this.state.turnt){
            return this.state.counter+0
        }else{
            if(this.state.counter>this.numberOfChildren-2){
                return 0
            }else{
                return this.state.counter+1
            }
        }
    };

    rightRightDisplayController =()=>{

        if(this.state.turnt){
            //return this.state.counter+1
            if(this.state.counter>this.numberOfChildren-2){
                return 0
            }else{
                return this.state.counter+1
            }
        }else{
            if(this.state.counter>this.numberOfChildren-2){
                return 0
            }else{
                return this.state.counter+1
            }
        }
    };

    leftDisplayController =()=>{

        if(this.state.turnt){
            return this.state.counter+0
        }else{
            if(this.state.counter===0){
                return this.numberOfChildren-1
            }else{
                return this.state.counter-1
            }
        }
    };

    leftLeftDisplayController =()=>{

        if(this.state.turnt){
            //return this.state.counter-1
            if(this.state.counter===0){
                return this.numberOfChildren-1
            }else{
                return this.state.counter-1
            }
        }else{
            if(this.state.counter===0){
                return this.numberOfChildren-1
            }else{
                return this.state.counter-1
            }
        }
    }

    getStyle=()=> {


        return [
            styles.square,
            {
                transform: [
                    {
                        translateX: this.state.pan.x
                    },
                    {
                        translateY: this.state.pan.y
                    },
                    {
                        rotate: this.state.pan.x.interpolate({

                            inputRange: [-this.state.screenWidthValue, 0, this.state.screenWidthValue],
                            outputRange: ["-31deg", "0deg", "34.5deg"]
                        })
                    }
                ]
            },

        ];
    }

    render() {

        const holderStyle={
            flex:1,
            width:'500%',
            backgroundColor:'transparent',//'#017acd',
            flexDirection: 'row',
            transform:
                [{translateX:-2*this.state.screenWidthValue}]
        }

        const leftSquare={
            flex:1,
            transform:
                [
                    {translateX: this.state.pan.x},
                    //{translateY: this.state.pan.y},
                    {translateY: this.state.pan.x.interpolate({
                            inputRange: [ -this.state.screenWidthValue, 0,this.state.screenWidthValue],
                            outputRange: [ this.state.screenHeightValue/1.7, this.state.screenHeightValue/4,0]
                        })

                    },
                    {
                        rotate: this.state.pan.x.interpolate({
                            inputRange: [ -this.state.screenWidthValue, 0,this.state.screenWidthValue],
                            outputRange: [ "-40deg", "-31deg","0deg"]
                        })
                    }
                ]
        };

        const leftLeftSquare={
            flex:1,
            transform:
                [
                    {translateX: this.state.pan.x},
                    {translateY: this.state.pan.x.interpolate({
                            inputRange: [ -this.state.screenWidthValue, 0,this.state.screenWidthValue],
                            outputRange: [ 0, 0,this.state.screenHeightValue*.25]
                        })},
                    {

                        rotate: this.state.pan.x.interpolate({

                            inputRange: [ -this.state.screenWidthValue, 0,this.state.screenWidthValue],
                            outputRange: [ "-31deg", "0deg","-31deg"]//was 35 in middle
                        })
                    }

                ]
        };

        const rightSquare={
            flex:1,
            transform:
                [
                    {translateX: this.state.pan.x},
                    {translateY: this.state.pan.x.interpolate({
                            inputRange: [ -this.state.screenWidthValue, 0,this.state.screenWidthValue],
                            outputRange: [0, this.state.screenHeightValue/3.75,this.state.screenHeightValue/1.5]
                        })},
                    {
                        rotate: this.state.pan.x.interpolate({
                            inputRange: [ -this.state.screenWidthValue, 0,this.state.screenWidthValue],
                            outputRange: [ "0deg", "35deg","45deg"]
                        })
                    }

                ]
        }

        const rightRightSquare={
            flex:1,
            transform:
                [
                    {translateX: this.state.pan.x},
                    {translateY: this.state.pan.x.interpolate({
                            inputRange: [ -this.state.screenWidthValue, 0,this.state.screenWidthValue],
                            outputRange: [ this.state.screenHeightValue*.265, 0,0]
                    })},
                    {
                        rotate: this.state.pan.x.interpolate({

                            inputRange: [ -this.state.screenWidthValue, 0,this.state.screenWidthValue],
                            outputRange: [ "34deg", "0deg","45deg"]
                        })
                    }
                ]
        }


        return (
            <View style={{
                flex: 1,
                backgroundColor:'transparent'
            }}
            >

                <View style={holderStyle}>

                    <Animated.View
                        style={leftLeftSquare}
                        {...this._panResponder.panHandlers}
                    >

                        {React.Children.toArray(this.props.children)[this.leftLeftDisplayController()]}

                    </Animated.View>

                    <Animated.View
                        style={leftSquare}
                        {...this._panResponder.panHandlers}
                    >
                        {React.Children.toArray(this.props.children)[this.leftDisplayController()]}

                    </Animated.View>

                    <Animated.View
                        style={this.getStyle()}
                        {...this._panResponder.panHandlers}
                    >

                        {React.Children.toArray(this.props.children)[this.middleViewController()]}


                    </Animated.View>

                    <Animated.View
                        style={rightSquare}
                        {...this._panResponder.panHandlers}
                    >

                        {React.Children.toArray(this.props.children)[this.rightDisplayController()]}

                    </Animated.View>

                    <Animated.View
                        style={rightRightSquare}
                        {...this._panResponder.panHandlers}
                    >

                        {React.Children.toArray(this.props.children)[this.rightRightDisplayController()]}

                    </Animated.View>

                </View>

            </View>
        );
    }
}

export class VerticalSwiper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenWidthValue:Dimensions.get('window').width*.9,
            screenHeightValue:Dimensions.get('window').height,
            pan: new Animated.ValueXY(),
            counter:0,
            turnt:false,
            turntDirection:'none',
        };

        this.numberOfChildren=React.Children.toArray(this.props.children).length
    }

    componentWillMount =()=> {
        this._animatedValueX = 0;
        this._animatedValueY = 0;
        this.state.pan.x.addListener((value) => this._animatedValueX = value.value);
        this.state.pan.y.addListener((value) => this._animatedValueY = value.value);

        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (e, gestureState) => {

                this.state.pan.setOffset({x: 0, y: 0});
                //this.state.pan.setOffset({x: this._animatedValueX, y: this._animatedValueY});
                this.state.pan.setValue({x: 0, y: 0});
                this.trunDown()
                this.directionNone()

            },
            onPanResponderMove: Animated.event([
                null, {
                    //dx: this.state.pan.x,
                    dy: this.state.pan.y
                },
            ]),
            onPanResponderRelease: (e,gestureState) => {
                //.moveY
                if(gestureState.dy < -this.state.screenHeightValue/2){
                    Animated.spring(this.state.pan, {
                        //toValue: ({x: -this.state.screenWidthValue, y: 200})
                        toValue: ({x: 0, y: -this.state.screenHeightValue}),
                        bounciness:1
                    }).start();
                    this.addCounter();
                    this.getTurnt();
                    this.onSwipeDown();
                }else if(gestureState.dy> this.state.screenHeightValue/2){
                    Animated.spring(this.state.pan, {
                        //toValue: ({x: this.state.screenWidthValue, y: 200})
                        toValue: ({x: 0, y: this.state.screenHeightValue}),//3.35
                        bounciness:1
                    }).start();
                    this.minusCounter()
                    this.getTurnt()
                    this.onSwipeUp();
                }
                else{
                    Animated.spring(this.state.pan, {
                        toValue: 0,
                        bounciness:1
                    }).start();
                }
            }
        });
    };

    componentWillUnmount =()=> {
        this.state.pan.x.removeAllListeners();
        this.state.pan.y.removeAllListeners();
    }

    addCounter=()=>{
        if(this.state.counter>(this.numberOfChildren-2)){
            this.setState({counter:0,turntDirection:'left'})
        }else{
            let counter=this.state.counter
            counter=counter+1
            this.setState({counter:counter,turntDirection:'left'})
        }
    };

    minusCounter=()=>{
        if(this.state.counter<1){
            this.setState({counter:this.numberOfChildren-1,turntDirection:'right'})
        }else{
            let counter=this.state.counter
            counter=counter-1
            this.setState({counter:counter,turntDirection:'right'})
        }
    };

    getTurnt = () =>{
        this.setState({turnt:true,})
    };

    trunDown = () =>{
        this.setState({turnt:false,})
    };

    directionNone = () =>{
        this.setState({turntDirection:'none'})
    };

    middleViewController = () =>{
        if(this.state.turntDirection==='none'){
            return this.state.counter
        }else if(this.state.turntDirection==='left'){
            if(this.state.counter===0){
                return this.numberOfChildren-1
            }else{
                return this.state.counter-1
            }
        }else if(this.state.turntDirection==='right'){

            if(this.state.counter>this.numberOfChildren-2){
                return 0
            }else{
                return this.state.counter+1
            }
        }
    };

    rightDisplayController =()=>{

        if(this.state.turnt){
            return this.state.counter+0
        }else{
            if(this.state.counter>this.numberOfChildren-2){
                return 0
            }else{
                return this.state.counter+1
            }
        }
    };

    leftDisplayController =()=>{

        if(this.state.turnt){
            return this.state.counter+0
        }else{
            if(this.state.counter===0){
                return this.numberOfChildren-1
            }else{
                return this.state.counter-1
            }
        }
    };

    onSwipeUp = () => {

        if(!this.props.onSwipeUp){
            return
        }

        this.props.onSwipeUp()
    };

    onSwipeDown = () => {

        if(!this.props.onSwipeDown){
            return
        }

        this.props.onSwipeDown()
    };

    getStyle=()=> {


        return [
            //styles.square,
            {
            height:this.state.screenHeightValue,
            backgroundColor: 'transparent',
            },
            {
                transform: [
                    {translateX: this.state.pan.x},
                    {translateY: this.state.pan.y},
                ]
            },
        ];
    };

    render() {

        const holderStyle={
            //flex:1,
            //height:this.state.screenHeightValue*3,
            backgroundColor:'transparent',//'#017acd',
            //flexDirection: 'row',
            transform: [{translateY:-1*this.state.screenHeightValue}]
        };

        const leftSquare={
            //flex:1,
            height:this.state.screenHeightValue,///3,
            backgroundColor: 'transparent',
            transform:
                [{translateY: this.state.pan.y}]
        };


        const rightSquare={
            //flex:1,
            height:this.state.screenHeightValue,///3,
            backgroundColor: 'transparent',
            transform:
                [{translateY: this.state.pan.y}]
        };

        return (
            <View style={{
                flex: 1,
                backgroundColor:'transparent'//'#017acd'
            }}
            >

                <View style={holderStyle}>

                    <Animated.View
                        style={leftSquare}
                        {...this._panResponder.panHandlers}
                    >
                        {React.Children.toArray(this.props.children)[this.leftDisplayController()]}

                    </Animated.View>

                    <Animated.View
                        style={this.getStyle()}
                        {...this._panResponder.panHandlers}
                    >
                        {React.Children.toArray(this.props.children)[this.middleViewController()]}

                    </Animated.View>

                    <Animated.View
                        style={rightSquare}
                        {...this._panResponder.panHandlers}
                    >

                        {React.Children.toArray(this.props.children)[this.rightDisplayController()]}

                    </Animated.View>


                </View>

            </View>
        );
    }
}



const styles = StyleSheet.create({

    square: {
        flex:1,
        backgroundColor: 'transparent',
    }
});