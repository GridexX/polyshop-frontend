import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, {
    stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { Euro, Inventory, LocalShipping } from "@mui/icons-material";
import { OrderStatus } from "../hooks/common";
import { useEffect, useState } from "react";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                "linear-gradient( 95deg,#9F73CA 0%,rgb(138,35,135) 100%)",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                "linear-gradient( 95deg,#9F73CA 0%,rgb(138,35,135) 100%)",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled("div")<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
    backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
        backgroundImage:
            "linear-gradient( 136deg, #9F73CA 0%, rgb(138,35,135) 100%)",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
        backgroundImage:
            "linear-gradient( 136deg, #9F73CA 0%, rgb(138,35,135) 100%)",
    }),
}));

function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <Check />,
        2: <Inventory />,
        3: <Euro />,
        4: <LocalShipping />,
    };

    return (
        <ColorlibStepIconRoot
            ownerState={{ completed, active }}
            className={className}
            color={active ? "primary" : "error"}
        >
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

type OrderProgressComponentProps = {
    orderStatus: OrderStatus | undefined;
};

export default function OrderProgressComponent({
    orderStatus,
}: OrderProgressComponentProps) {
    const [errorStep, setErrorStep] = useState<number | undefined>(undefined);
    const [activeStep, setActiveStep] = useState<number>(0);
    const [steps, setSteps] = useState<string[]>([
        "Crée",
        "Stock vérifié",
        "Payé",
        "Livré",
    ]);

    useEffect(() => {
        const determineStepsFromOrderStatus = (orderStatus: OrderStatus) => {
            if (orderStatus === "confirmed") {
                setActiveStep(0);
                setErrorStep(undefined);
            }

            if (orderStatus === "confirmed") {
                setActiveStep(1);
                setErrorStep(undefined);
            }

            if (orderStatus === "paid") {
                setActiveStep(2);
                setErrorStep(undefined);
            }

            if (orderStatus === "shipped") {
                setActiveStep(3);
                setErrorStep(undefined);
            }

            if (orderStatus === "missing_stock") {
                steps[1] = "Stock manquant";
                setActiveStep(0);
                setErrorStep(1);
              }
              
              if (orderStatus === "missing_payment") {
                steps[2] = "Paiement manquant";
                setActiveStep(1);
                setErrorStep(2);
              }
              
              if (orderStatus === "missing_shipping") {
                steps[3] = "Livraison manquante";
                setActiveStep(2);
                setErrorStep(3);
            }
        };

        if (orderStatus) {
            determineStepsFromOrderStatus(orderStatus);
        }
    }, [orderStatus, steps]);

    return (
        <>
            {orderStatus && (
                <Stack sx={{ width: "100%" }} spacing={4}>
                    <Stepper
                        alternativeLabel
                        // Return the index of the step that is active
                        activeStep={activeStep}
                        connector={<ColorlibConnector />}
                    >
                        {steps.map((step, index) => (
                            <Step key={step}>
                                <StepLabel
                                    StepIconComponent={ColorlibStepIcon}
                                    error={errorStep === index}
                                >
                                    {step}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Stack>
            )}
        </>
    );
}
