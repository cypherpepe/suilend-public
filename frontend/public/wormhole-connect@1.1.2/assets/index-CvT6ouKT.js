var Z=Object.defineProperty;var j=(t,e,s)=>e in t?Z(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var y=(t,e,s)=>j(t,typeof e!="symbol"?e+"":e,s);import{R as u,bF as Y,bG as I,bH as x,bI as ee,bJ as ne,bK as se,i as M,cG as O,cy as ae,cL as E,cM as N,d0 as B,bN as U,cm as _,ax as te,ap as b,aq as ie,cn as D,U as T,cl as re,at as me,co as R,c$ as oe,cb as ue,as as le}from"../main.js";const h=new u("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");new u("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");const A=new u("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");new u("So11111111111111111111111111111111111111112");new u("9pan9bMn5HatX4EJdBwg9VgCa7Uz5HL8N1m5D3NdXejP");class ce extends Error{constructor(e){super(e)}}class de extends ce{constructor(){super(...arguments),this.name="TokenOwnerOffCurveError"}}const ge=Y([I("mintAuthorityOption"),x("mintAuthority"),ee("supply"),ne("decimals"),se("isInitialized"),I("freezeAuthorityOption"),x("freezeAuthority")]);ge.span;function fe(t,e,s=!1,a=h,i=A){if(!s&&!u.isOnCurve(e.toBuffer()))throw new de;const[n]=u.findProgramAddressSync([e.toBuffer(),a.toBuffer(),t.toBuffer()],i);return n}function pe(t,e,s,a,i=h,n=A){return ye(t,e,s,a,M.Buffer.alloc(0),i,n)}function ye(t,e,s,a,i,n=h,r=A){const m=[{pubkey:t,isSigner:!0,isWritable:!0},{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:s,isSigner:!1,isWritable:!1},{pubkey:a,isSigner:!1,isWritable:!1},{pubkey:O.programId,isSigner:!1,isWritable:!1},{pubkey:n,isSigner:!1,isWritable:!1}];return new ae({keys:m,programId:r,data:i})}function L(t,e){return new E(G.TokenMessengerIdl,new u(t),e===void 0?{connection:null}:e)}function Me(t,e){return L(t,N(e))}function W(t,e){return new E(G.MessageTransmitterIdl,new u(t),e===void 0?{connection:null}:e)}function Se(t,e){return W(t,N(e))}const o=(t,e,s)=>{const a=[M.Buffer.from(B.bytes.utf8.encode(t))];if(s)for(const n of s)typeof n=="string"?a.push(M.Buffer.from(B.bytes.utf8.encode(n))):Array.isArray(n)?a.push(M.Buffer.from(n)):M.Buffer.isBuffer(n)?a.push(n):a.push(n.toBuffer());const i=u.findProgramAddressSync(a,e);return{publicKey:i[0],bump:i[1]}};function ke(t,e,s,a,i,n,r,m,l){const c=o("message_transmitter",t),d=o("token_messenger",e),f=o("token_minter",e),p=o("local_token",e,[s]),S=o("remote_token_messenger",e,[a.toString()]),k=o("sender_authority",e),P=L(e),v=o("__event_authority",e);return P.methods.depositForBurn({amount:new U(m.toString()),destinationDomain:a,mintRecipient:new u(r.toUint8Array())}).accounts({owner:i,senderAuthorityPda:k.publicKey,burnTokenAccount:n,messageTransmitter:c.publicKey,tokenMessenger:d.publicKey,remoteTokenMessenger:S.publicKey,tokenMinter:f.publicKey,localToken:p.publicKey,burnTokenMint:s,messageTransmitterProgram:t,tokenMessengerMinterProgram:e,tokenProgram:h,eventAuthority:v.publicKey,eventRentPayer:i,messageSentEventData:l}).instruction()}const C=6400n;function z(t){return(t-BigInt(1))/C*C+BigInt(1)}function F(t,e,s){const a=e.toString();return o("used_nonces",s,[a,z(t).toString()]).publicKey}async function he(t,e,s,a,i,n){const r=M.Buffer.from(_.serialize(a)),m=M.Buffer.from(te.decode(i)),l=new u(s),c=new u(a.payload.burnToken.toUint8Array()),d=new b(a.payload.mintRecipient).unwrap(),f=n?new u(n):d,p=a.sourceDomain.toString(),S=o("message_transmitter",t),k=o("token_messenger",e),P=o("token_minter",e),v=o("local_token",e,[l]),H=o("remote_token_messenger",e,[p]),V=o("token_pair",e,[p,c]),X=o("custody",e,[l]),$=o("message_transmitter_authority",t,[e]).publicKey,q=F(a.nonce,a.sourceDomain,t),J=o("__event_authority",t),Q=o("__event_authority",e),g=[];g.push({isSigner:!1,isWritable:!1,pubkey:k.publicKey}),g.push({isSigner:!1,isWritable:!1,pubkey:H.publicKey}),g.push({isSigner:!1,isWritable:!0,pubkey:P.publicKey}),g.push({isSigner:!1,isWritable:!0,pubkey:v.publicKey}),g.push({isSigner:!1,isWritable:!1,pubkey:V.publicKey}),g.push({isSigner:!1,isWritable:!0,pubkey:d}),g.push({isSigner:!1,isWritable:!0,pubkey:X.publicKey}),g.push({isSigner:!1,isWritable:!1,pubkey:h}),g.push({isSigner:!1,isWritable:!1,pubkey:Q.publicKey}),g.push({isSigner:!1,isWritable:!1,pubkey:e});const K=W(t);return K.methods.receiveMessage({message:r,attestation:m}).accounts({payer:f,caller:f,authorityPda:$,messageTransmitter:S.publicKey,usedNonces:q,receiver:e,systemProgram:O.programId,eventAuthority:J.publicKey,program:K.programId}).remainingAccounts(g).transaction()}class w{constructor(e,s,a,i){y(this,"network");y(this,"chain");y(this,"connection");y(this,"contracts");y(this,"tokenMessenger");y(this,"messageTransmitter");var m,l;if(this.network=e,this.chain=s,this.connection=a,this.contracts=i,e==="Devnet")throw new Error("CircleBridge not supported on Devnet");const n=(m=i.cctp)==null?void 0:m.messageTransmitter;if(!n)throw new Error(`Circle Messenge Transmitter contract for domain ${s} not found`);this.messageTransmitter=Se(new u(n),this.connection);const r=(l=i.cctp)==null?void 0:l.tokenMessenger;if(!r)throw new Error(`Circle Token Messenger contract for domain ${s} not found`);this.tokenMessenger=Me(new u(r),this.connection)}static async fromRpc(e,s){const[a,i]=await ie.chainFromRpc(e),n=s[i];if(n.network!==a)throw new Error(`Network mismatch: ${n.network} != ${a}`);return new w(a,i,e,n.contracts)}async*redeem(e,s,a){const i=new u(D.get(this.network,this.chain)),n=new b(e).unwrap(),r=new b(s.payload.mintRecipient).unwrap();if(!await this.connection.getAccountInfo(r)){const d=new T().add(pe(n,r,n,i));d.feePayer=n,yield this.createUnsignedTx({transaction:d},"CircleBridge.CreateATA")}const l=await he(this.messageTransmitter.programId,this.tokenMessenger.programId,i,s,a,n),c=new T;c.feePayer=n,c.add(l),yield this.createUnsignedTx({transaction:c},"CircleBridge.Redeem")}async*transfer(e,s,a){const i=new u(D.get(this.network,this.chain)),n=new b(e).unwrap(),r=fe(i,n),m=re.get(this.network,s.chain),l=s.address.toUniversalAddress(),c=me.generate(),d=await ke(this.messageTransmitter.programId,this.tokenMessenger.programId,i,m,n,r,l,a,c.publicKey),f=new T;f.feePayer=n,f.add(d),yield this.createUnsignedTx({transaction:f,signers:[c]},"CircleBridge.Transfer")}async isTransferCompleted(e){const s=F(e.nonce,e.sourceDomain,this.messageTransmitter.programId),a=z(e.nonce),{usedNonces:i}=await this.messageTransmitter.account.usedNonces.fetch(s),n=Number(e.nonce-a),r=i[Math.floor(n/64)];if(!r)throw new Error("Invalid nonce byte index");const m=n%64,l=new U((BigInt(1)<<BigInt(m)).toString());return!r.and(l).isZero()}async parseTransactionDetails(e){const s=await this.connection.getTransaction(e);if(!s||!s.meta)throw new Error("Transaction not found");const a=s.transaction.message.getAccountKeys();if(a.length<2)throw new Error("No message account found");const i=a.get(1),n=await this.connection.getAccountInfo(i);if(!n)throw new Error("No account data found");const r=new Uint8Array(n.data).slice(44),[m,l]=_.deserialize(r),{payload:c}=m,d=c.messageSender,f=c.mintRecipient,p=R(this.network,m.sourceDomain),S=R(this.network,m.destinationDomain),k={chain:p,address:c.burnToken};return{from:{chain:p,address:d},to:{chain:S,address:f},token:k,amount:c.amount,message:m,id:{hash:l}}}createUnsignedTx(e,s,a=!1){return new oe(e,this.network,this.chain,s,a)}}const be={version:"0.1.0",name:"token_messenger_minter",instructions:[{name:"initialize",accounts:[{name:"payer",isMut:!0,isSigner:!0},{name:"upgradeAuthority",isMut:!1,isSigner:!0},{name:"authorityPda",isMut:!1,isSigner:!1},{name:"tokenMessenger",isMut:!0,isSigner:!1},{name:"tokenMinter",isMut:!0,isSigner:!1},{name:"tokenMessengerMinterProgramData",isMut:!1,isSigner:!1},{name:"tokenMessengerMinterProgram",isMut:!1,isSigner:!1},{name:"systemProgram",isMut:!1,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"InitializeParams"}}]},{name:"transferOwnership",accounts:[{name:"owner",isMut:!1,isSigner:!0},{name:"tokenMessenger",isMut:!0,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"TransferOwnershipParams"}}]},{name:"acceptOwnership",accounts:[{name:"pendingOwner",isMut:!1,isSigner:!0},{name:"tokenMessenger",isMut:!0,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"AcceptOwnershipParams"}}]},{name:"addRemoteTokenMessenger",accounts:[{name:"payer",isMut:!0,isSigner:!0},{name:"owner",isMut:!1,isSigner:!0},{name:"tokenMessenger",isMut:!1,isSigner:!1},{name:"remoteTokenMessenger",isMut:!0,isSigner:!1},{name:"systemProgram",isMut:!1,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"AddRemoteTokenMessengerParams"}}]},{name:"removeRemoteTokenMessenger",accounts:[{name:"payee",isMut:!0,isSigner:!0},{name:"owner",isMut:!1,isSigner:!0},{name:"tokenMessenger",isMut:!1,isSigner:!1},{name:"remoteTokenMessenger",isMut:!0,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"RemoveRemoteTokenMessengerParams"}}]},{name:"depositForBurn",accounts:[{name:"owner",isMut:!1,isSigner:!0},{name:"eventRentPayer",isMut:!0,isSigner:!0},{name:"senderAuthorityPda",isMut:!1,isSigner:!1},{name:"burnTokenAccount",isMut:!0,isSigner:!1},{name:"messageTransmitter",isMut:!0,isSigner:!1},{name:"tokenMessenger",isMut:!1,isSigner:!1},{name:"remoteTokenMessenger",isMut:!1,isSigner:!1},{name:"tokenMinter",isMut:!1,isSigner:!1},{name:"localToken",isMut:!0,isSigner:!1},{name:"burnTokenMint",isMut:!0,isSigner:!1},{name:"messageSentEventData",isMut:!0,isSigner:!0},{name:"messageTransmitterProgram",isMut:!1,isSigner:!1},{name:"tokenMessengerMinterProgram",isMut:!1,isSigner:!1},{name:"tokenProgram",isMut:!1,isSigner:!1},{name:"systemProgram",isMut:!1,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"DepositForBurnParams"}}],returns:"u64"},{name:"depositForBurnWithCaller",accounts:[{name:"owner",isMut:!1,isSigner:!0},{name:"eventRentPayer",isMut:!0,isSigner:!0},{name:"senderAuthorityPda",isMut:!1,isSigner:!1},{name:"burnTokenAccount",isMut:!0,isSigner:!1},{name:"messageTransmitter",isMut:!0,isSigner:!1},{name:"tokenMessenger",isMut:!1,isSigner:!1},{name:"remoteTokenMessenger",isMut:!1,isSigner:!1},{name:"tokenMinter",isMut:!1,isSigner:!1},{name:"localToken",isMut:!0,isSigner:!1},{name:"burnTokenMint",isMut:!0,isSigner:!1},{name:"messageSentEventData",isMut:!0,isSigner:!0},{name:"messageTransmitterProgram",isMut:!1,isSigner:!1},{name:"tokenMessengerMinterProgram",isMut:!1,isSigner:!1},{name:"tokenProgram",isMut:!1,isSigner:!1},{name:"systemProgram",isMut:!1,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"DepositForBurnWithCallerParams"}}],returns:"u64"},{name:"replaceDepositForBurn",accounts:[{name:"owner",isMut:!1,isSigner:!0},{name:"eventRentPayer",isMut:!0,isSigner:!0},{name:"senderAuthorityPda",isMut:!1,isSigner:!1},{name:"messageTransmitter",isMut:!0,isSigner:!1},{name:"tokenMessenger",isMut:!1,isSigner:!1},{name:"messageSentEventData",isMut:!0,isSigner:!0},{name:"messageTransmitterProgram",isMut:!1,isSigner:!1},{name:"tokenMessengerMinterProgram",isMut:!1,isSigner:!1},{name:"systemProgram",isMut:!1,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"ReplaceDepositForBurnParams"}}],returns:"u64"},{name:"handleReceiveMessage",accounts:[{name:"authorityPda",isMut:!1,isSigner:!0},{name:"tokenMessenger",isMut:!1,isSigner:!1},{name:"remoteTokenMessenger",isMut:!1,isSigner:!1},{name:"tokenMinter",isMut:!1,isSigner:!1},{name:"localToken",isMut:!0,isSigner:!1},{name:"tokenPair",isMut:!1,isSigner:!1},{name:"recipientTokenAccount",isMut:!0,isSigner:!1},{name:"custodyTokenAccount",isMut:!0,isSigner:!1},{name:"tokenProgram",isMut:!1,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"HandleReceiveMessageParams"}}]},{name:"setTokenController",accounts:[{name:"owner",isMut:!1,isSigner:!0},{name:"tokenMessenger",isMut:!1,isSigner:!1},{name:"tokenMinter",isMut:!0,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"SetTokenControllerParams"}}]},{name:"pause",accounts:[{name:"pauser",isMut:!1,isSigner:!0},{name:"tokenMinter",isMut:!0,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"PauseParams"}}]},{name:"unpause",accounts:[{name:"pauser",isMut:!1,isSigner:!0},{name:"tokenMinter",isMut:!0,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"UnpauseParams"}}]},{name:"updatePauser",accounts:[{name:"owner",isMut:!1,isSigner:!0},{name:"tokenMessenger",isMut:!1,isSigner:!1},{name:"tokenMinter",isMut:!0,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"UpdatePauserParams"}}]},{name:"setMaxBurnAmountPerMessage",accounts:[{name:"tokenController",isMut:!1,isSigner:!0},{name:"tokenMinter",isMut:!1,isSigner:!1},{name:"localToken",isMut:!0,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"SetMaxBurnAmountPerMessageParams"}}]},{name:"addLocalToken",accounts:[{name:"payer",isMut:!0,isSigner:!0},{name:"tokenController",isMut:!1,isSigner:!0},{name:"tokenMinter",isMut:!1,isSigner:!1},{name:"localToken",isMut:!0,isSigner:!1},{name:"custodyTokenAccount",isMut:!0,isSigner:!1},{name:"localTokenMint",isMut:!1,isSigner:!1},{name:"tokenProgram",isMut:!1,isSigner:!1},{name:"systemProgram",isMut:!1,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"AddLocalTokenParams"}}]},{name:"removeLocalToken",accounts:[{name:"payee",isMut:!0,isSigner:!0},{name:"tokenController",isMut:!1,isSigner:!0},{name:"tokenMinter",isMut:!1,isSigner:!1},{name:"localToken",isMut:!0,isSigner:!1},{name:"custodyTokenAccount",isMut:!0,isSigner:!1},{name:"tokenProgram",isMut:!1,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"RemoveLocalTokenParams"}}]},{name:"linkTokenPair",accounts:[{name:"payer",isMut:!0,isSigner:!0},{name:"tokenController",isMut:!1,isSigner:!0},{name:"tokenMinter",isMut:!1,isSigner:!1},{name:"tokenPair",isMut:!0,isSigner:!1},{name:"systemProgram",isMut:!1,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"LinkTokenPairParams"}}]},{name:"unlinkTokenPair",accounts:[{name:"payee",isMut:!0,isSigner:!0},{name:"tokenController",isMut:!1,isSigner:!0},{name:"tokenMinter",isMut:!1,isSigner:!1},{name:"tokenPair",isMut:!0,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"UninkTokenPairParams"}}]},{name:"burnTokenCustody",accounts:[{name:"payee",isMut:!0,isSigner:!0},{name:"tokenController",isMut:!1,isSigner:!0},{name:"tokenMinter",isMut:!1,isSigner:!1},{name:"localToken",isMut:!1,isSigner:!1},{name:"custodyTokenAccount",isMut:!0,isSigner:!1},{name:"custodyTokenMint",isMut:!0,isSigner:!1},{name:"tokenProgram",isMut:!1,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"BurnTokenCustodyParams"}}]}],accounts:[{name:"tokenMessenger",type:{kind:"struct",fields:[{name:"owner",type:"publicKey"},{name:"pendingOwner",type:"publicKey"},{name:"localMessageTransmitter",type:"publicKey"},{name:"messageBodyVersion",type:"u32"},{name:"authorityBump",type:"u8"}]}},{name:"remoteTokenMessenger",type:{kind:"struct",fields:[{name:"domain",type:"u32"},{name:"tokenMessenger",type:"publicKey"}]}},{name:"tokenMinter",type:{kind:"struct",fields:[{name:"tokenController",type:"publicKey"},{name:"pauser",type:"publicKey"},{name:"paused",type:"bool"},{name:"bump",type:"u8"}]}},{name:"tokenPair",type:{kind:"struct",fields:[{name:"remoteDomain",type:"u32"},{name:"remoteToken",type:"publicKey"},{name:"localToken",type:"publicKey"},{name:"bump",type:"u8"}]}},{name:"localToken",type:{kind:"struct",fields:[{name:"custody",type:"publicKey"},{name:"mint",type:"publicKey"},{name:"burnLimitPerMessage",type:"u64"},{name:"messagesSent",type:"u64"},{name:"messagesReceived",type:"u64"},{name:"amountSent",type:"u128"},{name:"amountReceived",type:"u128"},{name:"bump",type:"u8"},{name:"custodyBump",type:"u8"}]}}],types:[{name:"AcceptOwnershipParams",type:{kind:"struct",fields:[]}},{name:"AddRemoteTokenMessengerParams",type:{kind:"struct",fields:[{name:"domain",type:"u32"},{name:"tokenMessenger",type:"publicKey"}]}},{name:"DepositForBurnWithCallerParams",type:{kind:"struct",fields:[{name:"amount",type:"u64"},{name:"destinationDomain",type:"u32"},{name:"mintRecipient",type:"publicKey"},{name:"destinationCaller",type:"publicKey"}]}},{name:"DepositForBurnParams",type:{kind:"struct",fields:[{name:"amount",type:"u64"},{name:"destinationDomain",type:"u32"},{name:"mintRecipient",type:"publicKey"}]}},{name:"HandleReceiveMessageParams",type:{kind:"struct",fields:[{name:"remoteDomain",type:"u32"},{name:"sender",type:"publicKey"},{name:"messageBody",type:"bytes"},{name:"authorityBump",type:"u8"}]}},{name:"InitializeParams",type:{kind:"struct",fields:[{name:"tokenController",type:"publicKey"},{name:"localMessageTransmitter",type:"publicKey"},{name:"messageBodyVersion",type:"u32"}]}},{name:"RemoveRemoteTokenMessengerParams",type:{kind:"struct",fields:[]}},{name:"ReplaceDepositForBurnParams",type:{kind:"struct",fields:[{name:"originalMessage",type:"bytes"},{name:"originalAttestation",type:"bytes"},{name:"newDestinationCaller",type:"publicKey"},{name:"newMintRecipient",type:"publicKey"}]}},{name:"TransferOwnershipParams",type:{kind:"struct",fields:[{name:"newOwner",type:"publicKey"}]}},{name:"AddLocalTokenParams",type:{kind:"struct",fields:[]}},{name:"BurnTokenCustodyParams",type:{kind:"struct",fields:[{name:"amount",type:"u64"}]}},{name:"LinkTokenPairParams",type:{kind:"struct",fields:[{name:"localToken",type:"publicKey"},{name:"remoteDomain",type:"u32"},{name:"remoteToken",type:"publicKey"}]}},{name:"PauseParams",type:{kind:"struct",fields:[]}},{name:"RemoveLocalTokenParams",type:{kind:"struct",fields:[]}},{name:"SetMaxBurnAmountPerMessageParams",type:{kind:"struct",fields:[{name:"burnLimitPerMessage",type:"u64"}]}},{name:"SetTokenControllerParams",type:{kind:"struct",fields:[{name:"tokenController",type:"publicKey"}]}},{name:"UninkTokenPairParams",type:{kind:"struct",fields:[]}},{name:"UnpauseParams",type:{kind:"struct",fields:[]}},{name:"UpdatePauserParams",type:{kind:"struct",fields:[{name:"newPauser",type:"publicKey"}]}},{name:"TokenMinterError",type:{kind:"enum",variants:[{name:"InvalidAuthority"},{name:"InvalidTokenMinterState"},{name:"ProgramPaused"},{name:"InvalidTokenPairState"},{name:"InvalidLocalTokenState"},{name:"InvalidPauser"},{name:"InvalidTokenController"},{name:"BurnAmountExceeded"},{name:"InvalidAmount"}]}}],events:[{name:"OwnershipTransferStarted",fields:[{name:"previousOwner",type:"publicKey",index:!1},{name:"newOwner",type:"publicKey",index:!1}]},{name:"OwnershipTransferred",fields:[{name:"previousOwner",type:"publicKey",index:!1},{name:"newOwner",type:"publicKey",index:!1}]},{name:"DepositForBurn",fields:[{name:"nonce",type:"u64",index:!1},{name:"burnToken",type:"publicKey",index:!1},{name:"amount",type:"u64",index:!1},{name:"depositor",type:"publicKey",index:!1},{name:"mintRecipient",type:"publicKey",index:!1},{name:"destinationDomain",type:"u32",index:!1},{name:"destinationTokenMessenger",type:"publicKey",index:!1},{name:"destinationCaller",type:"publicKey",index:!1}]},{name:"MintAndWithdraw",fields:[{name:"mintRecipient",type:"publicKey",index:!1},{name:"amount",type:"u64",index:!1},{name:"mintToken",type:"publicKey",index:!1}]},{name:"RemoteTokenMessengerAdded",fields:[{name:"domain",type:"u32",index:!1},{name:"tokenMessenger",type:"publicKey",index:!1}]},{name:"RemoteTokenMessengerRemoved",fields:[{name:"domain",type:"u32",index:!1},{name:"tokenMessenger",type:"publicKey",index:!1}]},{name:"SetTokenController",fields:[{name:"tokenController",type:"publicKey",index:!1}]},{name:"PauserChanged",fields:[{name:"newAddress",type:"publicKey",index:!1}]},{name:"SetBurnLimitPerMessage",fields:[{name:"token",type:"publicKey",index:!1},{name:"burnLimitPerMessage",type:"u64",index:!1}]},{name:"LocalTokenAdded",fields:[{name:"custody",type:"publicKey",index:!1},{name:"mint",type:"publicKey",index:!1}]},{name:"LocalTokenRemoved",fields:[{name:"custody",type:"publicKey",index:!1},{name:"mint",type:"publicKey",index:!1}]},{name:"TokenPairLinked",fields:[{name:"localToken",type:"publicKey",index:!1},{name:"remoteDomain",type:"u32",index:!1},{name:"remoteToken",type:"publicKey",index:!1}]},{name:"TokenPairUnlinked",fields:[{name:"localToken",type:"publicKey",index:!1},{name:"remoteDomain",type:"u32",index:!1},{name:"remoteToken",type:"publicKey",index:!1}]},{name:"Pause",fields:[]},{name:"Unpause",fields:[]},{name:"TokenCustodyBurned",fields:[{name:"custodyTokenAccount",type:"publicKey",index:!1},{name:"amount",type:"u64",index:!1}]}],errors:[{code:6e3,name:"InvalidAuthority",msg:"Invalid authority"},{code:6001,name:"InvalidTokenMessengerState",msg:"Invalid token messenger state"},{code:6002,name:"InvalidTokenMessenger",msg:"Invalid token messenger"},{code:6003,name:"InvalidOwner",msg:"Invalid owner"},{code:6004,name:"MalformedMessage",msg:"Malformed message"},{code:6005,name:"InvalidMessageBodyVersion",msg:"Invalid message body version"},{code:6006,name:"InvalidAmount",msg:"Invalid amount"},{code:6007,name:"InvalidDestinationDomain",msg:"Invalid destination domain"},{code:6008,name:"InvalidDestinationCaller",msg:"Invalid destination caller"},{code:6009,name:"InvalidMintRecipient",msg:"Invalid mint recipient"},{code:6010,name:"InvalidSender",msg:"Invalid sender"},{code:6011,name:"InvalidTokenPair",msg:"Invalid token pair"},{code:6012,name:"InvalidTokenMint",msg:"Invalid token mint"}]},Pe={version:"0.1.0",name:"message_transmitter",instructions:[{name:"initialize",accounts:[{name:"payer",isMut:!0,isSigner:!0},{name:"upgradeAuthority",isMut:!1,isSigner:!0},{name:"messageTransmitter",isMut:!0,isSigner:!1},{name:"messageTransmitterProgramData",isMut:!1,isSigner:!1},{name:"messageTransmitterProgram",isMut:!1,isSigner:!1},{name:"systemProgram",isMut:!1,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"InitializeParams"}}]},{name:"transferOwnership",accounts:[{name:"owner",isMut:!1,isSigner:!0},{name:"messageTransmitter",isMut:!0,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"TransferOwnershipParams"}}]},{name:"acceptOwnership",accounts:[{name:"pendingOwner",isMut:!1,isSigner:!0},{name:"messageTransmitter",isMut:!0,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"AcceptOwnershipParams"}}]},{name:"updatePauser",accounts:[{name:"owner",isMut:!1,isSigner:!0},{name:"messageTransmitter",isMut:!0,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"UpdatePauserParams"}}]},{name:"updateAttesterManager",accounts:[{name:"owner",isMut:!1,isSigner:!0},{name:"messageTransmitter",isMut:!0,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"UpdateAttesterManagerParams"}}]},{name:"pause",accounts:[{name:"pauser",isMut:!1,isSigner:!0},{name:"messageTransmitter",isMut:!0,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"PauseParams"}}]},{name:"unpause",accounts:[{name:"pauser",isMut:!1,isSigner:!0},{name:"messageTransmitter",isMut:!0,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"UnpauseParams"}}]},{name:"setMaxMessageBodySize",accounts:[{name:"owner",isMut:!1,isSigner:!0},{name:"messageTransmitter",isMut:!0,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"SetMaxMessageBodySizeParams"}}]},{name:"enableAttester",accounts:[{name:"payer",isMut:!0,isSigner:!0},{name:"attesterManager",isMut:!1,isSigner:!0},{name:"messageTransmitter",isMut:!0,isSigner:!1},{name:"systemProgram",isMut:!1,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"EnableAttesterParams"}}]},{name:"disableAttester",accounts:[{name:"payer",isMut:!0,isSigner:!0},{name:"attesterManager",isMut:!1,isSigner:!0},{name:"messageTransmitter",isMut:!0,isSigner:!1},{name:"systemProgram",isMut:!1,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"DisableAttesterParams"}}]},{name:"setSignatureThreshold",accounts:[{name:"attesterManager",isMut:!1,isSigner:!0},{name:"messageTransmitter",isMut:!0,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"SetSignatureThresholdParams"}}]},{name:"sendMessage",accounts:[{name:"eventRentPayer",isMut:!0,isSigner:!0},{name:"senderAuthorityPda",isMut:!1,isSigner:!0},{name:"messageTransmitter",isMut:!0,isSigner:!1},{name:"messageSentEventData",isMut:!0,isSigner:!0},{name:"senderProgram",isMut:!1,isSigner:!1},{name:"systemProgram",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"SendMessageParams"}}],returns:"u64"},{name:"sendMessageWithCaller",accounts:[{name:"eventRentPayer",isMut:!0,isSigner:!0},{name:"senderAuthorityPda",isMut:!1,isSigner:!0},{name:"messageTransmitter",isMut:!0,isSigner:!1},{name:"messageSentEventData",isMut:!0,isSigner:!0},{name:"senderProgram",isMut:!1,isSigner:!1},{name:"systemProgram",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"SendMessageWithCallerParams"}}],returns:"u64"},{name:"replaceMessage",accounts:[{name:"eventRentPayer",isMut:!0,isSigner:!0},{name:"senderAuthorityPda",isMut:!1,isSigner:!0},{name:"messageTransmitter",isMut:!0,isSigner:!1},{name:"messageSentEventData",isMut:!0,isSigner:!0},{name:"senderProgram",isMut:!1,isSigner:!1},{name:"systemProgram",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"ReplaceMessageParams"}}],returns:"u64"},{name:"receiveMessage",accounts:[{name:"payer",isMut:!0,isSigner:!0},{name:"caller",isMut:!1,isSigner:!0},{name:"authorityPda",isMut:!1,isSigner:!1},{name:"messageTransmitter",isMut:!1,isSigner:!1},{name:"usedNonces",isMut:!0,isSigner:!1},{name:"receiver",isMut:!1,isSigner:!1},{name:"systemProgram",isMut:!1,isSigner:!1},{name:"eventAuthority",isMut:!1,isSigner:!1},{name:"program",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"ReceiveMessageParams"}}]},{name:"reclaimEventAccount",accounts:[{name:"payee",isMut:!0,isSigner:!0,docs:["rent SOL receiver, should match original rent payer"]},{name:"messageTransmitter",isMut:!0,isSigner:!1},{name:"messageSentEventData",isMut:!0,isSigner:!1}],args:[{name:"params",type:{defined:"ReclaimEventAccountParams"}}]},{name:"getNoncePda",accounts:[{name:"messageTransmitter",isMut:!1,isSigner:!1}],args:[{name:"params",type:{defined:"GetNoncePDAParams"}}],returns:"publicKey"},{name:"isNonceUsed",accounts:[{name:"usedNonces",isMut:!1,isSigner:!1,docs:["Account will be explicitly loaded to avoid error when it's not initialized"]}],args:[{name:"params",type:{defined:"IsNonceUsedParams"}}],returns:"bool"}],accounts:[{name:"messageSent",type:{kind:"struct",fields:[{name:"rentPayer",type:"publicKey"},{name:"message",type:"bytes"}]}},{name:"messageTransmitter",docs:["Main state of the MessageTransmitter program"],type:{kind:"struct",fields:[{name:"owner",type:"publicKey"},{name:"pendingOwner",type:"publicKey"},{name:"attesterManager",type:"publicKey"},{name:"pauser",type:"publicKey"},{name:"paused",type:"bool"},{name:"localDomain",type:"u32"},{name:"version",type:"u32"},{name:"signatureThreshold",type:"u32"},{name:"enabledAttesters",type:{vec:"publicKey"}},{name:"maxMessageBodySize",type:"u64"},{name:"nextAvailableNonce",type:"u64"}]}},{name:"usedNonces",docs:["UsedNonces account holds an array of bits that indicate which nonces were already used","so they can't be resused to receive new messages. Array starts with the first_nonce and","holds flags for UsedNonces::MAX_NONCES. Nonces are recorded separately for each remote_domain."],type:{kind:"struct",fields:[{name:"remoteDomain",type:"u32"},{name:"firstNonce",type:"u64"},{name:"usedNonces",type:{array:["u64",100]}}]}}],types:[{name:"AcceptOwnershipParams",type:{kind:"struct",fields:[]}},{name:"DisableAttesterParams",type:{kind:"struct",fields:[{name:"attester",type:"publicKey"}]}},{name:"EnableAttesterParams",type:{kind:"struct",fields:[{name:"newAttester",type:"publicKey"}]}},{name:"GetNoncePDAParams",type:{kind:"struct",fields:[{name:"nonce",type:"u64"},{name:"sourceDomain",type:"u32"}]}},{name:"InitializeParams",type:{kind:"struct",fields:[{name:"localDomain",type:"u32"},{name:"attester",type:"publicKey"},{name:"maxMessageBodySize",type:"u64"},{name:"version",type:"u32"}]}},{name:"IsNonceUsedParams",type:{kind:"struct",fields:[{name:"nonce",type:"u64"}]}},{name:"PauseParams",type:{kind:"struct",fields:[]}},{name:"ReceiveMessageParams",type:{kind:"struct",fields:[{name:"message",type:"bytes"},{name:"attestation",type:"bytes"}]}},{name:"HandleReceiveMessageParams",type:{kind:"struct",fields:[{name:"remoteDomain",type:"u32"},{name:"sender",type:"publicKey"},{name:"messageBody",type:"bytes"},{name:"authorityBump",type:"u8"}]}},{name:"ReclaimEventAccountParams",type:{kind:"struct",fields:[{name:"attestation",type:"bytes"}]}},{name:"ReplaceMessageParams",type:{kind:"struct",fields:[{name:"originalMessage",type:"bytes"},{name:"originalAttestation",type:"bytes"},{name:"newMessageBody",type:"bytes"},{name:"newDestinationCaller",type:"publicKey"}]}},{name:"SendMessageWithCallerParams",type:{kind:"struct",fields:[{name:"destinationDomain",type:"u32"},{name:"recipient",type:"publicKey"},{name:"messageBody",type:"bytes"},{name:"destinationCaller",type:"publicKey"}]}},{name:"SendMessageParams",type:{kind:"struct",fields:[{name:"destinationDomain",type:"u32"},{name:"recipient",type:"publicKey"},{name:"messageBody",type:"bytes"}]}},{name:"SetMaxMessageBodySizeParams",type:{kind:"struct",fields:[{name:"newMaxMessageBodySize",type:"u64"}]}},{name:"SetSignatureThresholdParams",type:{kind:"struct",fields:[{name:"newSignatureThreshold",type:"u32"}]}},{name:"TransferOwnershipParams",type:{kind:"struct",fields:[{name:"newOwner",type:"publicKey"}]}},{name:"UnpauseParams",type:{kind:"struct",fields:[]}},{name:"UpdateAttesterManagerParams",type:{kind:"struct",fields:[{name:"newAttesterManager",type:"publicKey"}]}},{name:"UpdatePauserParams",type:{kind:"struct",fields:[{name:"newPauser",type:"publicKey"}]}},{name:"MathError",type:{kind:"enum",variants:[{name:"MathOverflow"},{name:"MathUnderflow"},{name:"ErrorInDivision"}]}}],events:[{name:"OwnershipTransferStarted",fields:[{name:"previousOwner",type:"publicKey",index:!1},{name:"newOwner",type:"publicKey",index:!1}]},{name:"OwnershipTransferred",fields:[{name:"previousOwner",type:"publicKey",index:!1},{name:"newOwner",type:"publicKey",index:!1}]},{name:"PauserChanged",fields:[{name:"newAddress",type:"publicKey",index:!1}]},{name:"AttesterManagerUpdated",fields:[{name:"previousAttesterManager",type:"publicKey",index:!1},{name:"newAttesterManager",type:"publicKey",index:!1}]},{name:"MessageReceived",fields:[{name:"caller",type:"publicKey",index:!1},{name:"sourceDomain",type:"u32",index:!1},{name:"nonce",type:"u64",index:!1},{name:"sender",type:"publicKey",index:!1},{name:"messageBody",type:"bytes",index:!1}]},{name:"SignatureThresholdUpdated",fields:[{name:"oldSignatureThreshold",type:"u32",index:!1},{name:"newSignatureThreshold",type:"u32",index:!1}]},{name:"AttesterEnabled",fields:[{name:"attester",type:"publicKey",index:!1}]},{name:"AttesterDisabled",fields:[{name:"attester",type:"publicKey",index:!1}]},{name:"MaxMessageBodySizeUpdated",fields:[{name:"newMaxMessageBodySize",type:"u64",index:!1}]},{name:"Pause",fields:[]},{name:"Unpause",fields:[]}],errors:[{code:6e3,name:"InvalidAuthority",msg:"Invalid authority"},{code:6001,name:"ProgramPaused",msg:"Instruction is not allowed at this time"},{code:6002,name:"InvalidMessageTransmitterState",msg:"Invalid message transmitter state"},{code:6003,name:"InvalidSignatureThreshold",msg:"Invalid signature threshold"},{code:6004,name:"SignatureThresholdAlreadySet",msg:"Signature threshold already set"},{code:6005,name:"InvalidOwner",msg:"Invalid owner"},{code:6006,name:"InvalidPauser",msg:"Invalid pauser"},{code:6007,name:"InvalidAttesterManager",msg:"Invalid attester manager"},{code:6008,name:"InvalidAttester",msg:"Invalid attester"},{code:6009,name:"AttesterAlreadyEnabled",msg:"Attester already enabled"},{code:6010,name:"TooFewEnabledAttesters",msg:"Too few enabled attesters"},{code:6011,name:"SignatureThresholdTooLow",msg:"Signature threshold is too low"},{code:6012,name:"AttesterAlreadyDisabled",msg:"Attester already disabled"},{code:6013,name:"MessageBodyLimitExceeded",msg:"Message body exceeds max size"},{code:6014,name:"InvalidDestinationCaller",msg:"Invalid destination caller"},{code:6015,name:"InvalidRecipient",msg:"Invalid message recipient"},{code:6016,name:"SenderNotPermitted",msg:"Sender is not permitted"},{code:6017,name:"InvalidSourceDomain",msg:"Invalid source domain"},{code:6018,name:"InvalidDestinationDomain",msg:"Invalid destination domain"},{code:6019,name:"InvalidMessageVersion",msg:"Invalid message version"},{code:6020,name:"InvalidUsedNoncesAccount",msg:"Invalid used nonces account"},{code:6021,name:"InvalidRecipientProgram",msg:"Invalid recipient program"},{code:6022,name:"InvalidNonce",msg:"Invalid nonce"},{code:6023,name:"NonceAlreadyUsed",msg:"Nonce already used"},{code:6024,name:"MessageTooShort",msg:"Message is too short"},{code:6025,name:"MalformedMessage",msg:"Malformed message"},{code:6026,name:"InvalidSignatureOrderOrDupe",msg:"Invalid signature order or dupe"},{code:6027,name:"InvalidAttesterSignature",msg:"Invalid attester signature"},{code:6028,name:"InvalidAttestationLength",msg:"Invalid attestation length"},{code:6029,name:"InvalidSignatureRecoveryId",msg:"Invalid signature recovery ID"},{code:6030,name:"InvalidSignatureSValue",msg:"Invalid signature S value"},{code:6031,name:"InvalidMessageHash",msg:"Invalid message hash"}]};ue(le,"CircleBridge",w);const G={TokenMessengerIdl:be,MessageTransmitterIdl:Pe};export{w as SolanaCircleBridge,G as idl};