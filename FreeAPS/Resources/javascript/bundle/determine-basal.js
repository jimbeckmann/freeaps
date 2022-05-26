var freeaps_determineBasal;(()=>{var e={4051:(e,a,r)=>{var t=r(6880);function o(e,a){a||(a=0);var r=Math.pow(10,a);return Math.round(e*r)/r}function i(e,a){return"mmol/L"===a.out_units?o(e/18,1):Math.round(e)}var n="",s="",l="",m="",u="",d="",c="",g="",f="";function p(e,a){var r=[2,7,12,16,20,50,60,80,90,100,110,150,180,200],t=[0,0,.4,.7,.7,-.5,-.5,-.3,-.2,0,0,.5,.7,.7],o=r.length-1,i=r[0],n=t[0],s=r[o],l=t[o],m=1,u=1,d=1,c=i;if(i>e)m=(u=n)+((l=t[1])-u)/((s=r[1])-(d=i))*(e-d);else if(s<e)m=(u=n=t[o-1])+(l-u)/(s-(d=i=r[o-1]))*(e-d);else for(var g=0;g<=o;g++){if(n=t[g],(i=r[g])==e){m=n;break}if(i>e){m=u+(n-u)/(i-(d=c))*(e-d);break}u=n,c=i}return m*=e>100?a.higher_ISFrange_weight:e>40?a.lower_ISFrange_weight:a.delta_ISFrange_weight}function h(e,a,r){if(void 0===e.smb_delivery_ratio_bg_range||0===e.smb_delivery_ratio_bg_range)return console.error("SMB delivery ratio set to fixed value "+e.smb_delivery_ratio),e.smb_delivery_ratio;var t=Math.min(e.smb_delivery_ratio_min,e.smb_delivery_ratio_max);if(a<=r)return console.error("SMB delivery ratio limited by minimum value "+t),t;var i=Math.max(e.smb_delivery_ratio_min,e.smb_delivery_ratio_max);if(a>=r+e.smb_delivery_ratio_bg_range)return console.error("SMB delivery ratio limited by maximum value "+i),i;var n=t+(i-t)*(a-r)/e.smb_delivery_ratio_bg_range;return console.error("SMB delivery ratio set to interpolated value "+o(n,2)),n}e.exports=function(e,a,r,b,v,_,B,M,y,x,S,w,C){var F,I,G,D=0,O="",T="",R=0,U=0,A=0,P=0,j=0,k=0;function q(e,a){var r=e.getTime();return new Date(r+36e5*a)}function E(e){var a=b.bolus_increment;.05!=a&&(a=.1);var r=e/a;return r>=1?o(Math.floor(r)*a,5):0}function W(e){function a(e){return e<10&&(e="0"+e),e}return a(e.getHours())+":"+a(e.getMinutes())+":00"}function z(e,a){var r=new Date("1/1/1999 "+e),t=new Date("1/1/1999 "+a);return(r.getTime()-t.getTime())/36e5}function L(e,a){var r=0,t=a,o=(e-a)/36e5,i=0,n=o,s=0;do{if(o>0){var l=W(t),m=C[0].start;for(let e=0;e<C.length;e++){var u=C[e].start;if(l==u){if(e+1<C.length){o>=(s=z(C[e+1].start,C[e].start))?i=s:o<s&&(i=o)}else if(e+1==C.length){let a=C[0].start;o>=(s=24-z(C[e].start,a))?i=s:o<s&&(i=o)}r+=E((m=C[e].rate)*i),o-=i,console.log("Dynamic ratios log: scheduled insulin added: "+E(m*i)+" U. Bas duration: "+i.toPrecision(3)+" h. Base Rate: "+m+" U/h. Time :"+l),t=q(t,i)}else if(l>u)if(e+1<C.length){var d=C[e+1].start;l<d&&(o>=(s=z(d,l))?i=s:o<s&&(i=o),r+=E((m=C[e].rate)*i),o-=i,console.log("Dynamic ratios log: scheduled insulin added: "+E(m*i)+" U. Bas duration: "+i.toPrecision(3)+" h. Base Rate: "+m+" U/h. Time :"+l),t=q(t,i))}else if(e==C.length-1){o>=(s=z("23:59:59",l))?i=s:o<s&&(i=o),r+=E((m=C[e].rate)*i),o-=i,console.log("Dynamic ratios log: scheduled insulin added: "+E(m*i)+" U. Bas duration: "+i.toPrecision(3)+" h. Base Rate: "+m+" U/h. Time :"+l),t=q(t,i)}}}}while(o>0&&o<n);return r}let N=S.length;var Z,$,H=new Date(S[N-1].timestamp),J=new Date(S[0].timestamp);("TempBasalDuration"==S[0]._type&&(J=new Date),(D=(J-H)/36e5)<23.5)?(j=L(H,(Z=24-D,$=H.getTime(),new Date($-36e5*Z))),O="24 hours of data is required for an accurate tdd calculation. Currently only "+D.toPrecision(3)+" hours of pump history data are available. Using your pump scheduled basals to fill in the missing hours. Scheduled basals added: "+j.toPrecision(5)+" U. "):O="";for(let e=0;e<S.length;e++)"Bolus"==S[e]._type&&(P+=S[e].amount);for(let e=1;e<S.length;e++)if("TempBasal"==S[e]._type&&S[e].rate>0){R=e,k=S[e].rate;var K=S[e-1]["duration (min)"]/60,Q=K,V=new Date(S[e-1].timestamp);do{if(e--,e<=0){morePresentTime=new Date;break}if("TempBasal"==S[e]._type||"PumpSuspend"==S[e]._type){morePresentTime=new Date(S[e].timestamp);break}}while(e>=0);var X=(morePresentTime-V)/36e5;X<Q&&(K=X),A+=E(k*K),e=R}for(let e=0;e<S.length;e++)if(0,0==S[e]["duration (min)"]||"PumpResume"==S[e]._type){let a=new Date(S[e].timestamp),r=a,t=e;do{if(--t,"TempBasal"==S[t]._type&&t>=0){r=new Date(S[t].timestamp);break}}while(t>0);(r-a)/36e5>0&&(j+=L(r,a))}for(let e=S.length-1;e>0;e--)if("TempBasalDuration"==S[e]._type){let a=S[e]["duration (min)"]/60,r=new Date(S[e].timestamp);var Y=r;let t=e;do{if(--t,t>=0&&("TempBasal"==S[t]._type||"PumpSuspend"==S[t]._type)){Y=new Date(S[t].timestamp);break}}while(t>0);if(0==e&&"TempBasalDuration"==S[0]._type&&(Y=new Date,a=S[e]["duration (min)"]/60),(Y-r)/36e5-a>0){j+=L(Y,q(r,a))}}U=P+A+j,I=". Bolus insulin: "+P.toPrecision(5)+" U",G=". Temporary basal insulin: "+A.toPrecision(5)+" U",F=". Insulin with scheduled basal rate: "+j.toPrecision(5)+" U",T=O+(". tdd past 24h is: "+U.toPrecision(5)+" U")+I+G+F,tddReason=", TDD: "+o(U,2)+" U. ";const ee=e.glucose;var ae=w.enableChris,re=w.enableDynamicCR;const te=b.autosens_min,oe=b.autosens_max,ie=w.adjustmentFactor,ne=b.min_bg;var se=!1,le="";1!=b.high_temptarget_raises_sensitivity&&1!=b.exercise_mode||(se=!0),1==b.use_autoisf&&1==ae&&(b.use_autoisf=!1),ne>=118&&1==se&&(b.use_autoisf=!1,ae=!1,le="Dynamic ISF temporarily off due to a high temp target/exercising. Current min target: "+ne);var me=", Dynamic ratios log: ",ue=", AF: "+ie+". ",de="BG: "+ee+" mg/dl ("+(.0555*ee).toPrecision(2)+" mmol/l). ",ce="";const ge=w.curve,fe=w.insulinPeakTime,pe=w.useCustomPeakTime;var he=55;switch(ge){case"rapid-acting":he=55;break;case"ultra-rapid":he=fe<75&&1==pe?120-fe:70}if(1==w.useNewFormula){var be=b.sens*ie*U*Math.log(ee/he+1)/1800;ce=", Logarithmic formula. InsulinFactor: "+he+", "}else{be=b.sens*ie*U*ee/277700;ce=", Original formula. "}var ve=b.carb_ratio,_e="";if(1==ae&&U>0){if(_e=", Dynamic ISF/CR: On/",be>oe?(le=", Dynamic ISF hit limit by autosens_max setting: "+oe+" ("+be.toPrecision(3)+"), ",be=oe):be<te&&(le=", Dynamic ISF hit limit by autosens_min setting: "+te+" ("+be.toPrecision(3)+"). ",be=te),1==re)_e+="On",ve=o(ve/be,2),b.carb_ratio=ve;else{_e+="Off"}var Be=b.sens/be;le+="Dynamic autosens.ratio set to "+be.toPrecision(3)+" with ISF: "+Be.toPrecision(3)+" mg/dl/U ("+(.0555*Be).toPrecision(3)+" mmol/l/U). "+_e,v.ratio=be,T+=me+de+ue+ce+le+_e}else T+=0==ae&&1==re?me+de+ue+ce+"Dynamic ISF is off."+_e:me+"Dynamic ISF is off. Dynamic CR is off."+_e;console.log(T),tddReason+=_e+ue+ce;var Me={},ye=new Date;if(x&&(ye=x),void 0===b||void 0===b.current_basal)return Me.error="Error: could not get current basal rate",Me;var xe=t(b.current_basal,b),Se=xe,we=new Date;x&&(we=x);var Ce,Fe=new Date(e.date),Ie=o((we-Fe)/60/1e3,1),Ge=e.glucose,De=e.noise;Ce=e.delta>-.5?"+"+o(e.delta,0):o(e.delta,0);var Oe=Math.min(e.delta,e.short_avgdelta),Te=Math.min(e.short_avgdelta,e.long_avgdelta),Re=Math.max(e.delta,e.short_avgdelta,e.long_avgdelta);(Ge<=10||38===Ge||De>=3)&&(Me.reason="CGM is calibrating, in ??? state, or noise is high");if(Ge>60&&0==e.delta&&e.short_avgdelta>-1&&e.short_avgdelta<1&&e.long_avgdelta>-1&&e.long_avgdelta<1&&("fakecgm"==e.device?(console.error("CGM data is unchanged ("+i(Ge,b)+"+"+i(e.delta,b)+") for 5m w/ "+i(e.short_avgdelta,b)+" mg/dL ~15m change & "+i(e.long_avgdelta,2)+" mg/dL ~45m change"),console.error("Simulator mode detected ("+e.device+"): continuing anyway")):!0),Ie>12||Ie<-5?Me.reason="If current system time "+we+" is correct, then BG data is too old. The last BG data was read "+Ie+"m ago at "+Fe:0===e.short_avgdelta&&0===e.long_avgdelta&&(e.last_cal&&e.last_cal<3?Me.reason="CGM was just calibrated":Me.reason="CGM data is unchanged ("+i(Ge,b)+"+"+i(e.delta,b)+") for 5m w/ "+i(e.short_avgdelta,b)+" mg/dL ~15m change & "+i(e.long_avgdelta,b)+" mg/dL ~45m change"),Ge<=10||38===Ge||De>=3||Ie>12||Ie<-5||0===e.short_avgdelta&&0===e.long_avgdelta)return a.rate>=Se?(Me.reason+=". Canceling high temp basal of "+a.rate,Me.deliverAt=ye,Me.temp="absolute",Me.duration=0,Me.rate=0,Me):0===a.rate&&a.duration>30?(Me.reason+=". Shortening "+a.duration+"m long zero temp to 30m. ",Me.deliverAt=ye,Me.temp="absolute",Me.duration=30,Me.rate=0,Me):(Me.reason+=". Temp "+a.rate+" <= current basal "+Se+"U/hr; doing nothing. ",Me);var Ue,Ae,Pe,je=b.max_iob;if(void 0!==b.min_bg&&(Ae=b.min_bg),void 0!==b.max_bg&&(Pe=b.max_bg),void 0===b.min_bg||void 0===b.max_bg)return Me.error="Error: could not determine target_bg. ",Me;Ue=(b.min_bg+b.max_bg)/2;var ke=b.exercise_mode||b.high_temptarget_raises_sensitivity,qe=100,Ee=160;if(b.half_basal_exercise_target&&(Ee=b.half_basal_exercise_target),ke&&b.temptargetSet&&Ue>qe||b.low_temptarget_lowers_sensitivity&&b.temptargetSet&&Ue<qe){var We=Ee-qe;We+Ue-qe>0?(sensitivityRatio=We/(We+Ue-qe),sensitivityRatio=Math.min(sensitivityRatio,b.autosens_max),sensitivityRatio=o(sensitivityRatio,2)):sensitivityRatio=b.autosens_max,process.stderr.write("Sensitivity ratio set to "+sensitivityRatio+" based on temp target of "+Ue+"; ")}else void 0!==v&&v&&(sensitivityRatio=v.ratio,process.stderr.write("Autosens ratio: "+sensitivityRatio+"; "));if(sensitivityRatio&&(Se=b.current_basal*sensitivityRatio,(Se=t(Se,b))!==xe?process.stderr.write("Adjusting basal from "+xe+" to "+Se+"; "):process.stderr.write("Basal unchanged: "+Se+"; ")),b.temptargetSet);else if(void 0!==v&&v&&(b.sensitivity_raises_target&&v.ratio<1||b.resistance_lowers_target&&v.ratio>1)){Ae=o((Ae-60)/v.ratio)+60,Pe=o((Pe-60)/v.ratio)+60;var ze=o((Ue-60)/v.ratio)+60;Ue===(ze=Math.max(80,ze))?process.stderr.write("target_bg unchanged: "+ze+"; "):process.stderr.write("target_bg from "+Ue+" to "+ze+"; "),Ue=ze}var Le=200,Ne=200,Ze=200;if(e.noise>=2){var $e=Math.max(1.1,b.noisyCGMTargetMultiplier);Math.min(250,b.maxRaw);Le=o(Math.min(200,Ae*$e)),Ne=o(Math.min(200,Ue*$e)),Ze=o(Math.min(200,Pe*$e)),process.stderr.write("Raising target_bg for noisy / raw CGM data, from "+Ue+" to "+Ne+"; "),Ae=Le,Ue=Ne,Pe=Ze}var He=Ae-.5*(Ae-40),Je=o(b.sens,1),Ke=b.sens;if(void 0!==v&&v&&((Ke=o(Ke=b.sens/sensitivityRatio,1))!==Je?process.stderr.write("ISF from "+i(Je,b)+" to "+i(Ke,b)):process.stderr.write("ISF unchanged: "+i(Ke,b)),n+="Autosens ratio: "+o(sensitivityRatio,2)+", ISF: "+i(Je,b)+"→"+i(Ke,b)),console.error("CR:"+b.carb_ratio),Ke=function(e,a,r,t,b,v,_,B){if(!r.use_autoisf)return console.error("autoISF disabled in Preferences"),e;var M=t.dura_p,y=t.delta_pl,x=t.delta_pn,S=t.r_squ,w=t.bg_acceleration,C=t.parabola_fit_a0,F=t.parabola_fit_a1,I=t.parabola_fit_a2,G=t.autoISF_duration,D=t.autoISF_average,O=r.autoisf_max,T=!1,R=1,U=1,A=1,P=a+10-D;if(!(b.mealCOB>0)||r.enableautoisf_with_COB){var j=t.pp_debug;if(d+="BG-accel: "+o(w,3)+", PF-minutes: "+M+", PF-corr: "+o(S,4)+", PF-nextDelta: "+i(x,r)+", PF-lastDelta: "+i(y,r)+", regular Delta: "+i(t.delta,r),console.error(j+d+" , Weights Accel/Brake: "+r.bgAccel_ISF_weight+" / "+r.bgBrake_ISF_weight),r.enable_BG_acceleration){var k=w;if(0!=t.parabola_fit_a2){var q=-F/2/I*5,E=o(C-q*q/25*I,1);(q=o(q,1))<0&&k<0?(f="saw max of "+i(E,r)+", about "+-q+" min ago",console.error("Parabolic fit "+f)):q<0&&k>0?(f="saw min of "+i(E,r)+", about "+-q+" min ago",console.error("Parabolic fit "+f)):q>0&&k<0?(f="predicts max of "+i(E,r)+", in about "+q+"min",console.error("Parabolic fit "+f)):q>0&&k>0&&(f="predicts min of "+i(E,r)+", in about "+q+" min",console.error("Parabolic fit "+f))}var W=S;if(W<=.9)f="acce_ISF by-passed, as correlation, "+o(W,3)+", is too low",console.error("Parabolic fit "+f),c+=", Parabolic Fit, "+f;else{c+=", Parabolic Fit, "+f+", lastΔ: "+i(y,r)+", nextΔ: "+i(x,r)+", Corr "+o(S,3)+", BG-Accel: "+o(k,2);var z=10*(W-.9),L=1;t.glucose<r.target_bg&&k>1&&(L=.5),A=1+k*L*(k<0?r.bgBrake_ISF_weight:r.bgAccel_ISF_weight)*z,console.error("Original result for acce_ISF: "+o(A,2)),1!=A&&(T=!0,c+=", acce-ISF Ratio: "+o(A,2))}}else console.error("autoISF BG accelertion adaption disabled in Preferences");var N=h(r,t.glucose,a);n+=", SMB Delivery Ratio:, "+o(N,2)+c+", autoISF";var Z=1+p(100-P,r);console.error("bg_ISF adaptation is "+o(Z,2)),Z<1&&A>1&&(g="bg-ISF adaptation lifted to "+o(Z*=A,2)+", as BG accelerates already",s="(lifted by "+o(A,2)+")",console.error(g));var $=1;if(Z<1)return($=Math.min(Z,A))<r.autoisf_min&&(g="final ISF factor "+o($,2)+" limited by autoisf_min "+r.autoisf_min,console.error(g),$=r.autoisf_min),s=" (lmtd.)",earlysens=Math.min(720,o(r.sens/Math.min(B,$),1)),console.error("early Return autoISF:  "+i(earlysens,r)),n+=", bg-ISF Ratio: "+o(Z,2)+s+", ISF: "+i(earlysens,r),earlysens;Z>1&&(T=!0,n+=", bg-ISF Ratio: "+o(Z,2));var H=t.delta;P>0?console.error("delta_ISF adaptation by-passed as average glucose < "+i(a+10,r)):t.short_avgdelta<0?console.error("delta_ISF adaptation by-passed as no rise or too short lived"):r.enableppisf_always||r.postmeal_ISF_duration>=(v-b.lastCarbTime)/1e3/3600?(R=1+Math.max(0,H*r.postmeal_ISF_weight),console.error("pp_ISF adaptation is "+o(R,2)),m=", pp-ISF Ratio: "+o(R,2),1!=R&&(T=!0)):(U=p(H,r),P>-20&&(U*=.5),U=1+U,console.error("delta_ISF adaptation is "+o(U,2)),u=", Δ-ISF Ratio: "+o(U,2),1!=U&&(T=!0));var J=1,K=r.autoisf_hourlychange;return b.mealCOB>0&&!r.enableautoisf_with_COB?console.error("dura_ISF by-passed; preferences disabled mealCOB of "+o(b.mealCOB,1)):G<10?console.error("dura_ISF by-passed; BG is only "+G+"m at level "+D):D<=a?console.error("dura_ISF by-passed; avg. glucose "+D+" below target "+i(a,r)):(J+=G/60*(K/a)*(D-a),T=!0,l=", Duration: "+G+", Avg: "+i(D,r)+", dura-ISF Ratio: "+o(J,2),console.error("dura_ISF  adaptation is "+o(J,2)+" because ISF "+e+" did not do it for "+o(G,1)+"m")),$=1,T?($=Math.max(J,Z,U,A,R),console.error("autoISF adaption ratios:"),console.error("  dura "+o(J,2)),console.error("  bg "+o(Z,2)),console.error("  delta "+o(U,2)),console.error("  pp "+o(R,2)),console.error("  accel "+o(A,2)),A<1&&(console.error("strongest ISF factor "+o($,2)+" weakened to "+o($*A,2)+" as bg decelerates already"),$*=A),$<r.autoisf_min?(console.error("final ISF factor "+o($,2)+" limited by autoisf_min "+r.autoisf_min),$=r.autoisf_min):$>O&&(console.error("final ISF factor "+o($,2)+" limited by autoisf_max "+O),$=O),$>=1&&(e=o(r.sens/Math.max($,B),1)),$<1&&(e=o(r.sens/Math.min($,B),1))):$=B,n+=m+u+l+", Ratio: "+o($,2)+", ISF: "+i(e,r),console.error("Inside autoISF: Ratio "+o($,2)+" resulting in "+i(e,r)),e}console.error("BG dependant autoISF by-passed; preferences disabled mealCOB of "+o(b.mealCOB,1))}(Ke,Ue,b,e,_,x,0,sensitivityRatio),void 0===r)return Me.error="Error: iob_data undefined. ",Me;var Qe,Ve=r;if(r.length,r.length>1&&(r=Ve[0]),void 0===r.activity||void 0===r.iob)return Me.error="Error: iob_data missing some property. ",Me;var Xe=((Qe=void 0!==r.lastTemp?o((new Date(we).getTime()-r.lastTemp.date)/6e4):0)+a.duration)%30;if(console.error("currenttemp:"+a.rate+" lastTempAge:"+Qe+"m, tempModulus:"+Xe+"m"),Me.temp="absolute",Me.deliverAt=ye,M&&a&&r.lastTemp&&a.rate!==r.lastTemp.rate&&Qe>10&&a.duration)return Me.reason="Warning: currenttemp rate "+a.rate+" != lastTemp rate "+r.lastTemp.rate+" from pumphistory; canceling temp",B.setTempBasal(0,0,b,Me,a);if(a&&r.lastTemp&&a.duration>0){var Ye=Qe-r.lastTemp.duration;if(Ye>5&&Qe>10)return Me.reason="Warning: currenttemp running but lastTemp from pumphistory ended "+Ye+"m ago; canceling temp",B.setTempBasal(0,0,b,Me,a)}var ea=o(-r.activity*Ke*5,2),aa=o(6*(Oe-ea));aa<0&&(aa=o(6*(Te-ea)))<0&&(aa=o(6*(e.long_avgdelta-ea)));var ra=Ge,ta=(ra=r.iob>0?o(Ge-r.iob*Ke):o(Ge-r.iob*Math.min(Ke,b.sens)))+aa;if(void 0===ta||isNaN(ta))return Me.error="Error: could not calculate eventualBG. Sensitivity: "+Ke+" Deviation: "+aa,Me;var oa=function(e,a,r){return o(r+(e-a)/24,1)}(Ue,ta,ea);Me={temp:"absolute",bg:Ge,tick:Ce,eventualBG:ta,insulinReq:0,reservoir:y,deliverAt:ye,sensitivityRatio};var ia=[],na=[],sa=[],la=[];ia.push(Ge),na.push(Ge),la.push(Ge),sa.push(Ge);var ma=function(e,a,r,t){return a?!e.allowSMB_with_high_temptarget&&e.temptargetSet&&t>100?(console.error("SMB disabled due to high temptarget of",t),!1):!0===r.bwFound&&!1===e.A52_risk_enable?(console.error("SMB disabled due to Bolus Wizard activity in the last 6 hours."),!1):!0===e.enableSMB_always?(r.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled due to enableSMB_always"),!0):!0===e.enableSMB_with_COB&&r.mealCOB?(r.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for COB of",r.mealCOB),!0):!0===e.enableSMB_after_carbs&&r.carbs?(r.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for 6h after carb entry"),!0):!0===e.enableSMB_with_temptarget&&e.temptargetSet&&t<100?(r.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for temptarget of",i(t,e)),!0):(console.error("SMB disabled (no enableSMB preferences active or no condition satisfied)"),!1):(console.error("SMB disabled (!microBolusAllowed)"),!1)}(b,M,_,Ue),ua=b.enableUAM,da=0,ca=0;da=o(Oe-ea,1);var ga=o(Oe-ea,1);csf=Ke/b.carb_ratio,console.error("profile.sens:"+i(b.sens,b)+", sens:"+i(Ke,b)+", CSF:"+o(csf,1));var fa=o(30*csf*5/60,1);da>fa&&(console.error("Limiting carb impact from "+da+" to "+fa+"mg/dL/5m (30g/h)"),da=fa);var pa=3;sensitivityRatio&&(pa/=sensitivityRatio);var ha=pa;if(_.carbs){pa=Math.max(pa,_.mealCOB/20);var ba=o((new Date(we).getTime()-_.lastCarbTime)/6e4),va=(_.carbs-_.mealCOB)/_.carbs;ha=o(ha=pa+1.5*ba/60,1),console.error("Last carbs "+ba+" minutes ago; remainingCATime:"+ha+"hours; "+o(100*va)+"% carbs absorbed")}var _a=Math.max(0,da/5*60*ha/2)/csf,Ba=90,Ma=1;b.remainingCarbsCap&&(Ba=Math.min(90,b.remainingCarbsCap)),b.remainingCarbsFraction&&(Ma=Math.min(1,b.remainingCarbsFraction));var ya=1-Ma,xa=Math.max(0,_.mealCOB-_a-_.carbs*ya),Sa=(xa=Math.min(Ba,xa))*csf*5/60/(ha/2),wa=o(_.slopeFromMaxDeviation,2),Ca=o(_.slopeFromMinDeviation,2),Fa=Math.min(wa,-Ca/3),Ia=0;0===da?ca=0:!0===b.floating_carbs?(ca=Math.min(60*ha/5/2,Math.max(0,_.carbs*csf/da)),Ia=Math.min(60*ha/5/2,Math.max(0,_.mealCOB*csf/da)),_.carbs>0&&(n+=", Floating Carbs:, CID: "+o(ca,1)+", MealCarbs: "+o(_.carbs,1)+", Not Floating:, CID: "+o(Ia,1)+", MealCOB: "+o(_.mealCOB,1),console.error("Floating Carbs CID: "+o(ca,1)+" / MealCarbs: "+o(_.carbs,1)+" vs. Not Floating:"+o(Ia,1)+" / MealCOB:"+o(_.mealCOB,1)))):ca=Math.min(60*ha/5/2,Math.max(0,_.mealCOB*csf/da)),console.error("Carb Impact:"+da+"mg/dL per 5m; CI Duration:"+o(5*ca/60*2,1)+"hours; remaining CI ("+ha/2+"h peak):",o(Sa,1)+"mg/dL per 5m");var Ga,Da,Oa,Ta,Ra,Ua=999,Aa=999,Pa=999,ja=Ge,ka=999,qa=999,Ea=999,Wa=999,za=ta,La=Ge,Na=Ge,Za=0,$a=[],Ha=[];try{Ve.forEach((function(e){var a=o(-e.activity*Ke*5,2),r=o(-e.iobWithZeroTemp.activity*Ke*5,2),t=da*(1-Math.min(1,na.length/12));za=na[na.length-1]+a+t;var i=la[la.length-1]+r,n=Math.max(0,Math.max(0,da)*(1-ia.length/Math.max(2*ca,1))),s=Math.min(ia.length,12*ha-ia.length),l=Math.max(0,s/(ha/2*12)*Sa);n+l,$a.push(o(l,0)),Ha.push(o(n,0)),COBpredBG=ia[ia.length-1]+a+Math.min(0,t)+n+l;var m=Math.max(0,ga+sa.length*Fa),u=Math.max(0,ga*(1-sa.length/Math.max(36,1))),d=Math.min(m,u);d>0&&(Za=o(5*(sa.length+1)/60,1)),UAMpredBG=sa[sa.length-1]+a+Math.min(0,t)+d,na.length<48&&na.push(za),ia.length<48&&ia.push(COBpredBG),sa.length<48&&sa.push(UAMpredBG),la.length<48&&la.push(i),COBpredBG<ka&&(ka=o(COBpredBG)),UAMpredBG<qa&&(qa=o(UAMpredBG)),za<Ea&&(Ea=o(za)),i<Wa&&(Wa=o(i));na.length>18&&za<Ua&&(Ua=o(za)),za>La&&(La=za),(ca||Sa>0)&&ia.length>18&&COBpredBG<Aa&&(Aa=o(COBpredBG)),(ca||Sa>0)&&COBpredBG>La&&(Na=COBpredBG),ua&&sa.length>12&&UAMpredBG<Pa&&(Pa=o(UAMpredBG)),ua&&UAMpredBG>La&&UAMpredBG}))}catch(e){console.error("Problem with iobArray.  Optional feature Advanced Meal Assist disabled")}_.mealCOB&&(console.error("predCIs (mg/dL/5m):"+Ha.join(" ")),console.error("remainingCIs:      "+$a.join(" "))),Me.predBGs={},na.forEach((function(e,a,r){r[a]=o(Math.min(401,Math.max(39,e)))}));for(var Ja=na.length-1;Ja>12&&na[Ja-1]===na[Ja];Ja--)na.pop();for(Me.predBGs.IOB=na,Oa=o(na[na.length-1]),la.forEach((function(e,a,r){r[a]=o(Math.min(401,Math.max(39,e)))})),Ja=la.length-1;Ja>6&&!(la[Ja-1]>=la[Ja]||la[Ja]<=Ue);Ja--)la.pop();if(Me.predBGs.ZT=la,o(la[la.length-1]),_.mealCOB>0&&(da>0||Sa>0)){for(ia.forEach((function(e,a,r){r[a]=o(Math.min(401,Math.max(39,e)))})),Ja=ia.length-1;Ja>12&&ia[Ja-1]===ia[Ja];Ja--)ia.pop();Me.predBGs.COB=ia,Ta=o(ia[ia.length-1]),ta=Math.max(ta,o(ia[ia.length-1]))}if(da>0||Sa>0){if(ua){for(sa.forEach((function(e,a,r){r[a]=o(Math.min(401,Math.max(39,e)))})),Ja=sa.length-1;Ja>12&&sa[Ja-1]===sa[Ja];Ja--)sa.pop();Me.predBGs.UAM=sa,Ra=o(sa[sa.length-1]),sa[sa.length-1]&&(ta=Math.max(ta,o(sa[sa.length-1])))}Me.eventualBG=ta}console.error("UAM Impact:"+ga+"mg/dL per 5m; UAM Duration:"+Za+"hours"),Ua=Math.max(39,Ua),Aa=Math.max(39,Aa),Pa=Math.max(39,Pa),Ga=o(Ua);var Ka=_.mealCOB/_.carbs;Da=o(Pa<999&&Aa<999?(1-Ka)*UAMpredBG+Ka*COBpredBG:Aa<999?(za+COBpredBG)/2:Pa<999?(za+UAMpredBG)/2:za),Wa>Da&&(Da=Wa),ja=o(ja=ca||Sa>0?ua?Ka*ka+(1-Ka)*qa:ka:ua?qa:Ea);var Qa=Pa;if(Wa<He)Qa=(Pa+Wa)/2;else if(Wa<Ue){var Va=(Wa-He)/(Ue-He);Qa=(Pa+(Pa*Va+Wa*(1-Va)))/2}else Wa>Pa&&(Qa=(Pa+Wa)/2);if(Qa=o(Qa),_.carbs)if(!ua&&Aa<999)Ga=o(Math.max(Ua,Aa));else if(Aa<999){var Xa=Ka*Aa+(1-Ka)*Qa;Ga=o(Math.max(Ua,Aa,Xa))}else Ga=ua?Qa:ja;else ua&&(Ga=o(Math.max(Ua,Qa)));Ga=Math.min(Ga,Da),process.stderr.write("minPredBG: "+Ga+" minIOBPredBG: "+Ua+" minZTGuardBG: "+Wa),Aa<999&&process.stderr.write(" minCOBPredBG: "+Aa),Pa<999&&process.stderr.write(" minUAMPredBG: "+Pa),console.error(" avgPredBG:"+Da+" COB/Carbs:"+_.mealCOB+"/"+_.carbs),Na>Ge&&(Ga=Math.min(Ga,Na)),Me.COB=_.mealCOB,Me.IOB=r.iob,Me.BGI=i(ea,b),Me.deviation=i(aa,b),Me.ISF=i(Ke,b),Me.CR=o(b.carb_ratio,2),Me.target_bg=i(Ue,b),Me.tdd=o(U,2),Me.reason=n+", COB: "+Me.COB+", Dev: "+Me.deviation+", BGI: "+Me.BGI+", CR: "+Me.CR+", Target: "+Me.target_bg+", minPredBG "+i(Ga,b)+", minGuardBG "+i(ja,b)+", IOBpredBG "+i(Oa,b)+tddReason,Ta>0&&(Me.reason+=", COBpredBG "+i(Ta,b)),Ra>0&&(Me.reason+=", UAMpredBG "+i(Ra,b)),Me.reason+="; ";var Ya=ra;Ya<40&&(Ya=Math.min(ja,Ya));var er,ar=He-Ya,rr=240,tr=240;if(_.mealCOB>0&&(da>0||Sa>0)){for(Ja=0;Ja<ia.length;Ja++)if(ia[Ja]<Ae){rr=5*Ja;break}for(Ja=0;Ja<ia.length;Ja++)if(ia[Ja]<He){tr=5*Ja;break}}else{for(Ja=0;Ja<na.length;Ja++)if(na[Ja]<Ae){rr=5*Ja;break}for(Ja=0;Ja<na.length;Ja++)if(na[Ja]<He){tr=5*Ja;break}}ma&&ja<He&&(console.error("minGuardBG "+i(ja,b)+" projected below "+i(He,b)+" - disabling SMB"),ma=!1),void 0===b.maxDelta_bg_threshold&&(er=.2),void 0!==b.maxDelta_bg_threshold&&(er=Math.min(b.maxDelta_bg_threshold,.4)),Re>er*Ge&&(console.error("maxDelta "+i(Re,b)+" > "+100*er+"% of BG "+i(Ge,b)+" - disabling SMB"),Me.reason+="maxDelta "+i(Re,b)+" > "+100*er+"% of BG "+i(Ge,b)+" - SMB disabled!, ",ma=!1),console.error("BG projected to remain above "+i(Ae,b)+" for "+rr+"minutes"),(tr<240||rr<60)&&console.error("BG projected to remain above "+i(He,b)+" for "+tr+"minutes");var or=tr,ir=b.current_basal*Ke*or/60,nr=Math.max(0,_.mealCOB-.25*_.carbs),sr=(ar-ir)/csf-nr;ir=o(ir),sr=o(sr),console.error("naive_eventualBG:"+ra+" bgUndershoot:"+ar+" zeroTempDuration:"+or+" zeroTempEffect:"+ir+" carbsReq:"+sr),sr>=b.carbsReqThreshold&&tr<=45&&(Me.carbsReq=sr,Me.reason+=sr+" add'l carbs req w/in "+tr+"m; ");var lr=0;if(Ge<He&&r.iob<20*-b.current_basal/60&&Oe>0&&Oe>oa)Me.reason+="IOB "+r.iob+" < "+o(20*-b.current_basal/60,2),Me.reason+=" and minDelta "+i(Oe,b)+" > expectedDelta "+i(oa,b)+"; ";else if(Ge<He||ja<He)return Me.reason+="minGuardBG "+i(ja,b)+"<"+i(He,b),lr=o(60*((ar=Ue-ja)/Ke)/b.current_basal),lr=30*o(lr/30),lr=Math.min(120,Math.max(30,lr)),B.setTempBasal(0,lr,b,Me,a);if(b.skip_neutral_temps&&Me.deliverAt.getMinutes()>=55)return Me.reason+="; Canceling temp at "+Me.deliverAt.getMinutes()+"m past the hour. ",B.setTempBasal(0,0,b,Me,a);var mr=0,ur=Se;if(ta<Ae){if(Me.reason+="Eventual BG "+i(ta,b)+" < "+i(Ae,b),Oe>oa&&Oe>0&&!sr)return ra<40?(Me.reason+=", naive_eventualBG < 40. ",B.setTempBasal(0,30,b,Me,a)):(e.delta>Oe?Me.reason+=", but Delta "+i(Ce,b)+" > expectedDelta "+i(oa,b):Me.reason+=", but Min. Delta "+Oe.toFixed(2)+" > Exp. Delta "+i(oa,b),a.duration>15&&t(Se,b)===t(a.rate,b)?(Me.reason+=", temp "+a.rate+" ~ req "+Se+"U/hr. ",Me):(Me.reason+="; setting current basal of "+Se+" as temp. ",B.setTempBasal(Se,30,b,Me,a)));mr=o(mr=2*Math.min(0,(ta-Ue)/Ke),2);var dr=Math.min(0,(ra-Ue)/Ke);if(dr=o(dr,2),Oe<0&&Oe>oa)mr=o(mr*(Oe/oa),2);if(ur=t(ur=Se+2*mr,b),a.duration*(a.rate-Se)/60<Math.min(mr,dr)-.3*Se)return Me.reason+=", "+a.duration+"m@"+a.rate.toFixed(2)+" is a lot less than needed. ",B.setTempBasal(ur,30,b,Me,a);if(void 0!==a.rate&&a.duration>5&&ur>=.8*a.rate)return Me.reason+=", temp "+a.rate+" ~< req "+ur+"U/hr. ",Me;if(ur<=0){if((lr=o(60*((ar=Ue-ra)/Ke)/b.current_basal))<0?lr=0:(lr=30*o(lr/30),lr=Math.min(120,Math.max(0,lr))),lr>0)return Me.reason+=", setting "+lr+"m zero temp. ",B.setTempBasal(ur,lr,b,Me,a)}else Me.reason+=", setting "+ur+"U/hr. ";return B.setTempBasal(ur,30,b,Me,a)}if(Oe<oa&&(!M||!ma))return e.delta<Oe?Me.reason+="Eventual BG "+i(ta,b)+" > "+i(Ae,b)+" but Delta "+i(Ce,b)+" < Exp. Delta "+i(oa,b):Me.reason+="Eventual BG "+i(ta,b)+" > "+i(Ae,b)+" but Min. Delta "+Oe.toFixed(2)+" < Exp. Delta "+i(oa,b),a.duration>15&&t(Se,b)===t(a.rate,b)?(Me.reason+=", temp "+a.rate+" ~ req "+Se+"U/hr. ",Me):(Me.reason+="; setting current basal of "+Se+" as temp. ",B.setTempBasal(Se,30,b,Me,a));if(Math.min(ta,Ga)<Pe&&(!M||!ma))return Me.reason+=i(ta,b)+"-"+i(Ga,b)+" in range: no temp required",a.duration>15&&t(Se,b)===t(a.rate,b)?(Me.reason+=", temp "+a.rate+" ~ req "+Se+"U/hr. ",Me):(Me.reason+="; setting current basal of "+Se+" as temp. ",B.setTempBasal(Se,30,b,Me,a));if(ta>=Pe&&(Me.reason+="Eventual BG "+i(ta,b)+" >= "+i(Pe,b)+", "),r.iob>je)return Me.reason+="IOB "+o(r.iob,2)+" > max_iob "+je,a.duration>15&&t(Se,b)===t(a.rate,b)?(Me.reason+=", temp "+a.rate+" ~ req "+Se+"U/hr. ",Me):(Me.reason+="; setting current basal of "+Se+" as temp. ",B.setTempBasal(Se,30,b,Me,a));(mr=o((Math.min(Ga,ta)-Ue)/Ke,2))>je-r.iob&&(Me.reason+="max_iob "+je+", ",mr=je-r.iob),ur=t(ur=Se+2*mr,b),mr=o(mr,3),Me.insulinReq=mr;var cr=o((new Date(we).getTime()-r.lastBolusTime)/6e4,1);if(M&&ma&&Ge>He){var gr=o(_.mealCOB/b.carb_ratio,3);if(b.use_autoisf)fr=b.smb_max_range_extension;else{console.error("autoISF disabled, SMB range extension disabled");var fr=1}fr>1&&console.error("SMB max range extended from default by factor "+fr);var pr=0;void 0===b.maxSMBBasalMinutes?(pr=o(fr*b.current_basal*30/60,1),console.error("profile.maxSMBBasalMinutes undefined: defaulting to 30m")):r.iob>gr&&r.iob>0?(console.error("IOB",r.iob,"> COB",_.mealCOB+"; mealInsulinReq =",gr),b.maxUAMSMBBasalMinutes?(console.error("profile.maxUAMSMBBasalMinutes:",b.maxUAMSMBBasalMinutes,"profile.current_basal:",b.current_basal),pr=o(fr*b.current_basal*b.maxUAMSMBBasalMinutes/60,1)):(console.error("profile.maxUAMSMBBasalMinutes undefined: defaulting to 30m"),pr=o(30*b.current_basal/60,1))):(console.error("profile.maxSMBBasalMinutes:",b.maxSMBBasalMinutes,"profile.current_basal:",b.current_basal),pr=o(fr*b.current_basal*b.maxSMBBasalMinutes/60,1));var hr=b.bolus_increment,br=1/hr;if(b.use_autoisf)var vr=h(b,Ge,Ue);else console.error("autoISF disabled, don't adjust SMB Delivery Ratio"),vr=.5;vr>.5&&console.error("SMB Delivery Ratio increased from default 0.5 to "+o(vr,2));var _r=Math.min(mr*vr,pr);_r=Math.floor(_r*br)/br,lr=o(60*((Ue-(ra+Ua)/2)/Ke)/b.current_basal),mr>0&&_r<hr&&(lr=0);var Br=0;lr<=0?lr=0:lr>=30?(lr=30*o(lr/30),lr=Math.min(60,Math.max(0,lr))):(Br=o(Se*lr/30,2),lr=30),Me.reason+=" insulinReq "+mr,_r>=pr&&(Me.reason+="; maxBolus "+pr),lr>0&&(Me.reason+="; setting "+lr+"m low temp of "+Br+"U/h"),Me.reason+=". ";var Mr=3;b.SMBInterval&&(Mr=Math.min(10,Math.max(1,b.SMBInterval)));var yr=o(Mr-cr,0),xr=o(60*(Mr-cr),0)%60;if(console.error("naive_eventualBG",ra+",",lr+"m "+Br+"U/h temp needed; last bolus",cr+"m ago; maxBolus: "+pr),cr>Mr?_r>0&&(Me.units=_r,Me.reason+="Microbolusing "+_r+"U. "):Me.reason+="Waiting "+yr+"m "+xr+"s to microbolus again. ",lr>0)return Me.rate=Br,Me.duration=lr,Me}var Sr=B.getMaxSafeBasal(b);return ur>Sr&&(Me.reason+="adj. req. rate: "+ur+" to maxSafeBasal: "+Sr+", ",ur=t(Sr,b)),a.duration*(a.rate-Se)/60>=2*mr?(Me.reason+=a.duration+"m@"+a.rate.toFixed(2)+" > 2 * insulinReq. Setting temp basal of "+ur+"U/hr. ",B.setTempBasal(ur,30,b,Me,a)):void 0===a.duration||0===a.duration?(Me.reason+="no temp, setting "+ur+"U/hr. ",B.setTempBasal(ur,30,b,Me,a)):a.duration>5&&t(ur,b)<=t(a.rate,b)?(Me.reason+="temp "+a.rate+" >~ req "+ur+"U/hr. ",Me):(Me.reason+="temp "+a.rate+"<"+ur+"U/hr. ",B.setTempBasal(ur,30,b,Me,a))}},6880:(e,a,r)=>{var t=r(6654);e.exports=function(e,a){var r=20;void 0!==a&&"string"==typeof a.model&&(t(a.model,"54")||t(a.model,"23"))&&(r=40);return e<1?Math.round(e*r)/r:e<10?Math.round(20*e)/20:Math.round(10*e)/10}},2705:(e,a,r)=>{var t=r(5639).Symbol;e.exports=t},9932:e=>{e.exports=function(e,a){for(var r=-1,t=null==e?0:e.length,o=Array(t);++r<t;)o[r]=a(e[r],r,e);return o}},9750:e=>{e.exports=function(e,a,r){return e==e&&(void 0!==r&&(e=e<=r?e:r),void 0!==a&&(e=e>=a?e:a)),e}},4239:(e,a,r)=>{var t=r(2705),o=r(9607),i=r(2333),n=t?t.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":n&&n in Object(e)?o(e):i(e)}},531:(e,a,r)=>{var t=r(2705),o=r(9932),i=r(1469),n=r(3448),s=t?t.prototype:void 0,l=s?s.toString:void 0;e.exports=function e(a){if("string"==typeof a)return a;if(i(a))return o(a,e)+"";if(n(a))return l?l.call(a):"";var r=a+"";return"0"==r&&1/a==-Infinity?"-0":r}},7561:(e,a,r)=>{var t=r(7990),o=/^\s+/;e.exports=function(e){return e?e.slice(0,t(e)+1).replace(o,""):e}},1957:(e,a,r)=>{var t="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g;e.exports=t},9607:(e,a,r)=>{var t=r(2705),o=Object.prototype,i=o.hasOwnProperty,n=o.toString,s=t?t.toStringTag:void 0;e.exports=function(e){var a=i.call(e,s),r=e[s];try{e[s]=void 0;var t=!0}catch(e){}var o=n.call(e);return t&&(a?e[s]=r:delete e[s]),o}},2333:e=>{var a=Object.prototype.toString;e.exports=function(e){return a.call(e)}},5639:(e,a,r)=>{var t=r(1957),o="object"==typeof self&&self&&self.Object===Object&&self,i=t||o||Function("return this")();e.exports=i},7990:e=>{var a=/\s/;e.exports=function(e){for(var r=e.length;r--&&a.test(e.charAt(r)););return r}},6654:(e,a,r)=>{var t=r(9750),o=r(531),i=r(554),n=r(9833);e.exports=function(e,a,r){e=n(e),a=o(a);var s=e.length,l=r=void 0===r?s:t(i(r),0,s);return(r-=a.length)>=0&&e.slice(r,l)==a}},1469:e=>{var a=Array.isArray;e.exports=a},3218:e=>{e.exports=function(e){var a=typeof e;return null!=e&&("object"==a||"function"==a)}},7005:e=>{e.exports=function(e){return null!=e&&"object"==typeof e}},3448:(e,a,r)=>{var t=r(4239),o=r(7005);e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==t(e)}},8601:(e,a,r)=>{var t=r(4841),o=1/0;e.exports=function(e){return e?(e=t(e))===o||e===-1/0?17976931348623157e292*(e<0?-1:1):e==e?e:0:0===e?e:0}},554:(e,a,r)=>{var t=r(8601);e.exports=function(e){var a=t(e),r=a%1;return a==a?r?a-r:a:0}},4841:(e,a,r)=>{var t=r(7561),o=r(3218),i=r(3448),n=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,l=/^0o[0-7]+$/i,m=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(i(e))return NaN;if(o(e)){var a="function"==typeof e.valueOf?e.valueOf():e;e=o(a)?a+"":a}if("string"!=typeof e)return 0===e?e:+e;e=t(e);var r=s.test(e);return r||l.test(e)?m(e.slice(2),r?2:8):n.test(e)?NaN:+e}},9833:(e,a,r)=>{var t=r(531);e.exports=function(e){return null==e?"":t(e)}}},a={};function r(t){var o=a[t];if(void 0!==o)return o.exports;var i=a[t]={exports:{}};return e[t](i,i.exports,r),i.exports}r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}();var t=r(4051);freeaps_determineBasal=t})();
